import { useCallback, useEffect, useRef, useState } from "react";

export const REFRESH_SECONDS = 15 * 60; // 900 - matches Open-Meteo's own
// "current" data refresh interval (its response includes interval: 900),
// so this polls at exactly the rate the underlying data actually changes,
// not more.

function forecastUrl(city) {
    const params = new URLSearchParams({
        latitude: city.lat,
        longitude: city.lon,
        current: "temperature_2m,weather_code,wind_speed_10m,is_day",
        timezone: "auto",
    });
    return `https://api.open-meteo.com/v1/forecast?${params}`;
}

async function fetchCityWeather(city) {
    const response = await fetch(forecastUrl(city));
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const json = await response.json();
    return { current: json.current, timezone: json.timezone };
}

/**
 * Polls Open-Meteo for a fixed list of cities and drives a countdown to the
 * next refresh. Split into two effects rather than one:
 *
 *  - a 1-second interval that only ever decrements a counter - a pure,
 *    side-effect-free state update
 *  - a separate effect that reacts when that counter reaches 0 and performs
 *    the actual fetch
 *
 * Triggering the fetch directly from inside the interval's setState updater
 * would be fewer lines, but React explicitly documents updater functions as
 * expected to be pure (https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state) -
 * calling a fetch from inside one risks firing it twice under Strict Mode's
 * dev-mode double-invocation. Keeping the fetch in its own effect avoids
 * that, and keeping the initial mount value (REFRESH_SECONDS) different from
 * the trigger value (0) means the "mount" fetch and the "countdown expired"
 * fetch never collide, with no extra ref needed to skip a first run.
 */
export function useWeatherPolling(cities) {
    const [weatherByCity, setWeatherByCity] = useState(() =>
        Object.fromEntries(cities.map((city) => [city.name, { status: "loading" }]))
    );
    const [secondsRemaining, setSecondsRemaining] = useState(REFRESH_SECONDS);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const isMountedRef = useRef(true);

    useEffect(() => {
        // Reset on every real run, not just relying on the useRef(true)
        // initializer: React 18 StrictMode deliberately mounts, cleans up,
        // and remounts once in development to surface exactly this class of
        // bug. Without this line, that first simulated unmount's cleanup
        // sets isMountedRef.current to false and nothing ever sets it back
        // to true again - so every refresh() below silently no-ops forever,
        // even on the real mount that follows.
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // Refreshes silently: a slow or failed refresh keeps the previous
    // reading on screen (flagged with staleness/error) rather than
    // flashing back to a loading state every 15 minutes.
    const refresh = useCallback(async () => {
        setIsRefreshing(true);
        const results = await Promise.all(
            cities.map(async (city) => {
                try {
                    const weather = await fetchCityWeather(city);
                    return [city.name, { status: "ready", ...weather, fetchedAt: Date.now() }];
                } catch (error) {
                    return [city.name, { status: "error", message: error.message }];
                }
            })
        );

        if (!isMountedRef.current) {
            return;
        }

        setWeatherByCity((previous) => {
            const next = { ...previous };
            for (const [name, result] of results) {
                if (result.status === "error" && previous[name] && previous[name].status === "ready") {
                    // keep the last good reading, just note it is stale
                    next[name] = { ...previous[name], stale: true, message: result.message };
                } else {
                    next[name] = result;
                }
            }
            return next;
        });
        setLastUpdated(new Date());
        setIsRefreshing(false);
        // A refresh - however it was triggered - means the next one is a
        // full REFRESH_SECONDS away again. This used to live only in the
        // countdown-expired effect below, so a manual "Refresh now" click
        // fetched fresh data but left the existing countdown running
        // untouched, about to fire another refresh moments later.
        // Resetting it here covers every caller of refresh() at once.
        setSecondsRemaining(REFRESH_SECONDS);
    }, [cities]);

    // Initial load, once.
    useEffect(() => {
        refresh();
    }, [refresh]);

    // The countdown. Pure decrement only - see the function doc comment
    // above for why the fetch itself lives in the next effect instead.
    useEffect(() => {
        const id = setInterval(() => {
            setSecondsRemaining((seconds) => Math.max(seconds - 1, 0));
        }, 1000);
        return () => clearInterval(id);
    }, []);

    // Fires exactly once each time the countdown reaches 0. refresh() itself
    // rearms secondsRemaining back to REFRESH_SECONDS on completion (see
    // above), which changes this effect's dependency and re-runs it - the
    // guard below makes that a no-op, so it does not loop.
    useEffect(() => {
        if (secondsRemaining !== 0) {
            return;
        }
        refresh();
    }, [secondsRemaining, refresh]);

    return { weatherByCity, secondsRemaining, lastUpdated, isRefreshing, refresh };
}
