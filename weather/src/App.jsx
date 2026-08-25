import "./App.css";
import Switch from "./Switch";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { CITIES } from "./lib/cities";
import { REFRESH_SECONDS, useWeatherPolling } from "./hooks/useWeatherPolling";
import WeatherCard from "./WeatherCard";
import { useEffect } from "react";

function formatCountdown(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function Weather() {
    const { theme } = useTheme();
    const { weatherByCity, secondsRemaining, lastUpdated, isRefreshing, refresh } = useWeatherPolling(CITIES);

    useEffect(() => {
        document.body.style.background = theme === "light" ? "white" : "#111";
        document.body.style.color = theme === "light" ? "#111" : "white";
    }, [theme]);

    const progress = Math.round(((REFRESH_SECONDS - secondsRemaining) / REFRESH_SECONDS) * 100);

    return (
        <div className="App">
            <header>
                <h1>Weather</h1>
                <Switch />
            </header>
            <p className="App__subtitle">Glasgow &middot; Samara &middot; Nha Trang</p>

            <div className="countdown">
                <div className="countdown__row">
                    <span data-testid="countdown">Next update in {formatCountdown(secondsRemaining)}</span>
                    <button type="button" onClick={refresh} disabled={isRefreshing}>
                        {isRefreshing ? "Refreshing…" : "Refresh now"}
                    </button>
                </div>
                <div className="countdown__bar">
                    <div className="countdown__bar-fill" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className="weather-grid">
                {CITIES.map((city) => (
                    <WeatherCard key={city.name} name={city.name} weather={weatherByCity[city.name]} />
                ))}
            </div>

            <p className="App__footer">
                Data from{" "}
                <a href="https://open-meteo.com" target="_blank" rel="noreferrer">
                    Open-Meteo
                </a>
                {lastUpdated && <> &middot; last updated {lastUpdated.toLocaleTimeString()}</>}
            </p>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <Weather />
        </ThemeProvider>
    );
}

export default App;
