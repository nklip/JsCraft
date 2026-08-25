import { StrictMode } from "react";
import { fireEvent, render as rtlRender, screen, within } from "@testing-library/react";
import { beforeEach, afterEach, expect, test, vi } from "vitest";
import App from "./App";

// StrictMode is what actually caught the real bug this suite is written
// against: in development it deliberately mounts, cleans up, and remounts
// every component once, to surface exactly the class of "ref never reset"
// mistake this hook originally had. Testing Library's render() does not
// wrap in it by default, and index.jsx does, so the plain render() here
// would give false confidence - the suite would stay green even if that
// bug came back. Rendering through StrictMode here is what keeps this test
// file able to catch it again.
function render(ui) {
  return rtlRender(<StrictMode>{ui}</StrictMode>);
}

function mockForecast({ temperature_2m = 15, weather_code = 0, wind_speed_10m = 10 } = {}) {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      timezone: "Europe/London",
      current: {
        time: "2026-08-25T12:00",
        temperature_2m,
        weather_code,
        wind_speed_10m,
        is_day: 1,
      },
    }),
  };
}

// A mocked fetch still resolves through several real microtask hops (await
// fetch -> await json -> Promise.all -> setState -> the effect's own
// .then). advanceTimersByTimeAsync flushes microtasks between timer
// callbacks, but a single call at the exact moment a timer fires does not
// guarantee every one of those hops has settled yet. Rather than guess how
// many, flush() just asks a few extra times - each call is a no-op once
// nothing is pending.
async function flush(times = 3) {
  for (let i = 0; i < times; i++) {
    await vi.advanceTimersByTimeAsync(0);
  }
}

function cityCard(name) {
  return screen.getByText(name).closest("article");
}

const CITIES_COUNT = 3;

// StrictMode doubles exactly one thing here: the effect that fires the
// initial refresh() on mount runs, cleans up, and runs again as part of
// React's mount-simulate-unmount-remount dance, so the very first load
// makes 6 fetch calls (3 cities x 2) rather than 3. Every subsequent
// refresh - the countdown reaching 0, or a manual click - is a normal
// state-driven effect run, not part of that mount dance, so those each
// add exactly CITIES_COUNT more, same as without StrictMode.
const MOUNT_FETCH_CALLS = CITIES_COUNT * 2;

let fetchSpy;

beforeEach(() => {
  vi.useFakeTimers();
  fetchSpy = vi.spyOn(global, "fetch");
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

test("shows all three cities, loading first, then their readings", async () => {
  fetchSpy.mockResolvedValue(mockForecast({ temperature_2m: 21 }));

  render(<App />);

  expect(screen.getByText("Glasgow")).toBeInTheDocument();
  expect(screen.getByText("Samara")).toBeInTheDocument();
  expect(screen.getByText("Nha Trang")).toBeInTheDocument();
  expect(screen.getAllByText("Loading…")).toHaveLength(3);

  await flush();

  expect(fetchSpy).toHaveBeenCalledTimes(MOUNT_FETCH_CALLS);
  for (const name of ["Glasgow", "Samara", "Nha Trang"]) {
    expect(cityCard(name)).toHaveTextContent("21°C");
  }
});

test("counts down every second and refreshes once it reaches 0", async () => {
  fetchSpy.mockResolvedValue(mockForecast());
  render(<App />);
  await flush();

  expect(screen.getByTestId("countdown")).toHaveTextContent("Next update in 15:00");

  await vi.advanceTimersByTimeAsync(1000);
  expect(screen.getByTestId("countdown")).toHaveTextContent("Next update in 14:59");
  expect(fetchSpy).toHaveBeenCalledTimes(MOUNT_FETCH_CALLS); // no refetch yet

  // run out the remaining 14:59, then let the triggered refresh settle
  await vi.advanceTimersByTimeAsync(14 * 60 * 1000 + 59 * 1000);
  await flush();

  expect(screen.getByTestId("countdown")).toHaveTextContent("Next update in 15:00");
  expect(fetchSpy).toHaveBeenCalledTimes(MOUNT_FETCH_CALLS + CITIES_COUNT);
});

test("clicking Refresh now fetches immediately and rearms the countdown", async () => {
  fetchSpy.mockResolvedValue(mockForecast());
  render(<App />);
  await flush();

  expect(fetchSpy).toHaveBeenCalledTimes(MOUNT_FETCH_CALLS);

  // let the countdown move off 15:00 first, so resetting it back is an
  // observable change rather than a coincidence
  await vi.advanceTimersByTimeAsync(37 * 1000);
  expect(screen.getByTestId("countdown")).toHaveTextContent("Next update in 14:23");

  fireEvent.click(screen.getByText("Refresh now"));
  await flush();

  expect(fetchSpy).toHaveBeenCalledTimes(MOUNT_FETCH_CALLS + CITIES_COUNT);
  expect(screen.getByTestId("countdown")).toHaveTextContent("Next update in 15:00");
});

test("a failed fetch reports an error for that city without crashing the page", async () => {
  fetchSpy.mockImplementation((url) => {
    if (String(url).includes("latitude=53.2001")) {
      // Samara
      return Promise.reject(new Error("network down"));
    }
    return Promise.resolve(mockForecast());
  });

  render(<App />);
  await flush();

  expect(within(cityCard("Samara")).getByText(/Couldn't load/)).toBeInTheDocument();

  // the other two cities are unaffected
  expect(cityCard("Glasgow")).not.toHaveTextContent("Couldn't load");
});

test("a refresh failure keeps the last known reading instead of blanking the card", async () => {
  fetchSpy.mockResolvedValue(mockForecast({ temperature_2m: 18 }));
  render(<App />);
  await flush();
  for (const name of ["Glasgow", "Samara", "Nha Trang"]) {
    expect(cityCard(name)).toHaveTextContent("18°C");
  }

  fetchSpy.mockRejectedValue(new Error("timeout"));
  await vi.advanceTimersByTimeAsync(15 * 60 * 1000);
  await flush();

  // stale reading is still visible, plus a note that it could not refresh
  for (const name of ["Glasgow", "Samara", "Nha Trang"]) {
    const card = cityCard(name);
    expect(card).toHaveTextContent("18°C");
    expect(card).toHaveTextContent(/Couldn't refresh/);
  }
});
