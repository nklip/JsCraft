// Fixed, hardcoded list rather than Open-Meteo's geocoding endpoint - this
// app only ever shows these three cities, so a second API and an extra
// round trip would not buy anything. Coordinates are verified against the
// live API (see the README) - Open-Meteo snaps them to its nearest grid
// point, which is why the response echoes back slightly different values.
export const CITIES = [
    { name: "Glasgow", lat: 55.8642, lon: -4.2518 },
    { name: "Samara", lat: 53.2001, lon: 50.15 },
    { name: "Nha Trang", lat: 12.2388, lon: 109.1967 },
];
