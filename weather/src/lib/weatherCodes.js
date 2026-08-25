// Open-Meteo reports condition as a WMO "weather code" integer, not text -
// this is the interpretation table from Open-Meteo's own docs
// (https://open-meteo.com/en/docs), trimmed to the codes it actually
// returns for "current" conditions.
const WEATHER_CODES = {
    0: { label: "Clear sky", icon: "☀️" },
    1: { label: "Mainly clear", icon: "🌤️" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Overcast", icon: "☁️" },
    45: { label: "Fog", icon: "🌫️" },
    48: { label: "Depositing rime fog", icon: "🌫️" },
    51: { label: "Light drizzle", icon: "🌦️" },
    53: { label: "Moderate drizzle", icon: "🌦️" },
    55: { label: "Dense drizzle", icon: "🌦️" },
    56: { label: "Light freezing drizzle", icon: "🌧️" },
    57: { label: "Dense freezing drizzle", icon: "🌧️" },
    61: { label: "Slight rain", icon: "🌧️" },
    63: { label: "Moderate rain", icon: "🌧️" },
    65: { label: "Heavy rain", icon: "🌧️" },
    66: { label: "Light freezing rain", icon: "🌧️" },
    67: { label: "Heavy freezing rain", icon: "🌧️" },
    71: { label: "Slight snow fall", icon: "🌨️" },
    73: { label: "Moderate snow fall", icon: "🌨️" },
    75: { label: "Heavy snow fall", icon: "🌨️" },
    77: { label: "Snow grains", icon: "🌨️" },
    80: { label: "Slight rain showers", icon: "🌦️" },
    81: { label: "Moderate rain showers", icon: "🌦️" },
    82: { label: "Violent rain showers", icon: "⛈️" },
    85: { label: "Slight snow showers", icon: "🌨️" },
    86: { label: "Heavy snow showers", icon: "🌨️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
    96: { label: "Thunderstorm, slight hail", icon: "⛈️" },
    99: { label: "Thunderstorm, heavy hail", icon: "⛈️" },
};

export function describeWeatherCode(code) {
    return WEATHER_CODES[code] || { label: "Unknown", icon: "❓" };
}
