# Weather
<sub>[Back to JsCraft](../README.md#content)</sub>

Live weather for Glasgow, Samara and Nha Trang, pulled from
[Open-Meteo](https://open-meteo.com) - a free, keyless weather API with open
CORS, so this fetches it directly from the browser with no backend. A
countdown ticks down from 15:00 to the next automatic refresh; a "Refresh
now" button does one immediately.

## Table of content
<sub>[Back to top](#weather)</sub>

- [The countdown](#the-countdown)
- [Handling a bad connection](#handling-a-bad-connection)
- [Running it](#running-it)

## The countdown
<sub>[Back to top](#weather)</sub>

`useWeatherPolling` (in `src/hooks/useWeatherPolling.js`) is two effects, on
purpose, rather than one:

```js
// effect 1: a pure, side-effect-free countdown
useEffect(() => {
    const id = setInterval(() => {
        setSecondsRemaining((seconds) => Math.max(seconds - 1, 0));
    }, 1000);
    return () => clearInterval(id);
}, []);

// effect 2: reacts when the countdown reaches 0, refreshes, rearms it
useEffect(() => {
    if (secondsRemaining !== 0) return;
    refresh().then(() => setSecondsRemaining(REFRESH_SECONDS));
}, [secondsRemaining, refresh]);
```

It would be fewer lines to call `refresh()` straight from inside the
interval's `setSecondsRemaining` updater. [React's own docs](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state)
say that updater function should be pure - calling a fetch from inside one
risks firing it twice under Strict Mode's dev-mode double-invocation.
Keeping the fetch in its own effect avoids that, and it is why the
countdown starts at `REFRESH_SECONDS` (900) rather than 0: the "just
mounted" fetch and the "countdown expired" fetch trigger off two different
values, so nothing needs a ref to skip a first run.

900 seconds is not an arbitrary number either - Open-Meteo's own response
says `"interval": 900` for its current-conditions data, so this polls at
exactly the rate the underlying numbers actually change.

## Handling a bad connection
<sub>[Back to top](#weather)</sub>

Each of the three cities is fetched independently (`Promise.all`, each
wrapped in its own `try/catch`), so one city being unreachable does not
take the other two down with it. A refresh that fails after a city already
has a good reading keeps that reading on screen - flagged as stale - rather
than blanking the card back to a loading state every time a request drops.

## Running it
<sub>[Back to top](#weather)</sub>

Built with [Vite](https://vite.dev/); tests run under [Vitest](https://vitest.dev/),
using fake timers to drive the full 15-minute countdown in milliseconds
rather than waiting on the clock.

```bash
npm install
npm start        # dev server (npm run dev is the same thing)
npm test         # run the suite once
npm run test:watch
npm run build    # production bundle into build/
npm run preview  # serve the built bundle
```

JSX lives in `.jsx` files. Vite builds with rolldown, which will not parse JSX
out of a `.js` file, so anything containing JSX carries the matching extension.
