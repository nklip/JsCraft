import { describeWeatherCode } from "./lib/weatherCodes";

function localTime(isoTime) {
    // Open-Meteo already returns current.time in the city's own local time
    // when the request carries timezone=auto, so this just reformats it -
    // no timezone math, no date library.
    const [, time] = isoTime.split("T");
    return time;
}

function WeatherCard({ name, weather }) {
    if (weather.status === "loading") {
        return (
            <article className="weather-card" aria-busy="true">
                <h2>{name}</h2>
                <p className="weather-card__loading">Loading…</p>
            </article>
        );
    }

    if (weather.status === "error") {
        return (
            <article className="weather-card weather-card--error">
                <h2>{name}</h2>
                <p className="weather-card__error">Couldn&apos;t load: {weather.message}</p>
            </article>
        );
    }

    const { current, timezone, stale } = weather;
    const { label, icon } = describeWeatherCode(current.weather_code);

    return (
        <article className="weather-card">
            <h2>{name}</h2>
            <p className="weather-card__temp">
                <span aria-hidden="true">{icon}</span> {Math.round(current.temperature_2m)}°C
            </p>
            <p className="weather-card__label">{label}</p>
            <dl className="weather-card__meta">
                <div>
                    <dt>Wind</dt>
                    <dd>{current.wind_speed_10m} km/h</dd>
                </div>
                <div>
                    <dt>Local time</dt>
                    <dd>{localTime(current.time)}</dd>
                </div>
            </dl>
            {stale && <p className="weather-card__stale">Couldn&apos;t refresh - showing the last known reading.</p>}
        </article>
    );
}

export default WeatherCard;
