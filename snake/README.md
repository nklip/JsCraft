# Snake without Canvas

A Snake game drawn with CSS Grid instead of `<canvas>`. Open `index.html` in a
browser and play - no server, no build step, no dependencies.

## Structure

Six files, each owning one concern:

| file | responsibility |
| --- | --- |
| `js/grid.js` | grid size, random positions, boundary checks |
| `js/input.js` | keyboard handling, current direction |
| `js/snake.js` | snake body, movement, growth, self-intersection |
| `js/food.js` | food placement and consumption |
| `js/overlay.js` | the end-of-round panel: artwork, message, restart button |
| `js/game.js` | entry point: the render loop, win/lose checks, restart |

They are loaded as six ordinary scripts, in dependency order:

```html
<script src="./js/grid.js"  defer></script>
<script src="./js/input.js" defer></script>
<script src="./js/snake.js" defer></script>
<script src="./js/food.js"  defer></script>
<script src="./js/overlay.js" defer></script>
<script src="./js/game.js"  defer></script>
```

## Restarting

A finished round does **not** reload the page. It resets state in place -
`SnakeGame.input.reset()`, `SnakeGame.snake.reset()`, then
`SnakeGame.food.reset()` in that order, since the food has to be placed against
the already-reset snake - and starts the loop again.

That is deliberate, and it is a focus fix rather than a performance one. The
game listens for keys on `window`, and `window` only receives them while the
document has focus. The old restart was `confirm()` followed by
`location.reload()`: the native dialog moved focus to browser chrome, and the
newly loaded document never got it back, so after the first round the arrow keys
did nothing until you clicked the board. The page cannot scroll either, so the
key presses just produced the system beep.

So there is no native dialog at all. `js/overlay.js` draws an in-page panel,
keeps focus on its own button while it is up, and `game.js` puts focus back on
the board when the round restarts. `#game-board` carries `tabindex="0"` so it
can hold focus, and is focused on load.

Restarting in place is also what lets state survive between rounds - a reload
would throw away any round counter.

### Adding artwork and per-round targets

`SnakeGame.overlay.show()` takes an optional `art` url, rendered above the title,
and sets `.overlay--win` or `.overlay--lose` so the two outcomes can look
different:

```js
SnakeGame.overlay.show({
    outcome: 'win',
    title: 'You won!',
    message: 'Round 1 complete.',
    buttonLabel: 'Next round',
    art: './assets/happy.png'
})
```

The win target lives in `game.js` as a `foodToWin` variable rather than a
constant, and `checkWin()` counts food eaten rather than comparing snake length.
A round counter therefore only has to set `foodToWin` before restarting - the
loop itself does not change.

## Why not ES modules?

This project used `import`/`export` with `<script type="module">`. That works,
but only over `http://`. Opening `index.html` directly from disk failed with:

```
Access to script at 'file:///PATH_TO_THE_FILE.js' from origin 'null' has been blocked
by CORS policy: Cross origin requests are only supported for protocol schemes:
http, data, isolated-app, chrome-extension, chrome, https, chrome-untrusted.
```

Module scripts are **fetched**, and fetches follow CORS rules. A page opened
from disk has the opaque origin `null`, and `file:` is not in the allowed list,
so every module load is rejected. Classic scripts are not fetched under CORS
rules, so they load from disk without complaint.

The previous fix was "install the Live Server extension". That works too, but it
means a ~150 line game cannot be opened without tooling. Bundling with esbuild
was the other option, and it was rejected on purpose: it would add
`package.json`, `package-lock.json`, ~10 MB of `node_modules`, a generated
`bundle.js` committed to git, and a rebuild step after every edit - to a project
that is otherwise six static files.

### Why the IIFE + namespace, and not just plain scripts

Dropping `import`/`export` alone breaks this code. Classic scripts share one
global scope, and three of the original five files each declared `update` and `draw`:

```
draw    -> snake.js, food.js, game.js
update  -> snake.js, food.js, game.js
```

ES modules kept those apart because `game.js` renamed them on import
(`update as updateSnake`, `update as updateFood`). In a single shared scope the
last file loaded silently overwrites the others - no error, no warning, just a
game that half works.

So each file wraps its body in an IIFE and returns only its public API onto one
shared namespace:

```js
var SnakeGame = SnakeGame || {};

SnakeGame.grid = (function () {

    const GRID_SIZE = 21          // private - not returned, so unreachable outside

    function randomGridPosition() { /* ... */ }
    function outsideGrid(position) { /* ... */ }

    return { randomGridPosition, outsideGrid }
})()
```

Callers then use `SnakeGame.snake.update()` and `SnakeGame.food.update()` -
distinct names, no collision. The `return {...}` is the export list; everything
else stays private, exactly as with modules. `snakeBody`, `GRID_SIZE`,
`equalPositions` and `addSegments` are all unreachable from outside their file.

The result is one global (`SnakeGame`) instead of the 28 names a plain
conversion drops into one shared scope - 17 of which land on `window` as
function declarations, the rest sharing script scope.

### Two things that will bite you

**`defer` is required, not decorative.** `type="module"` implies deferred
execution; a plain `<script src>` does not. `game.js` reads `#game-board` at top
level, so without `defer` it runs before `<body>` exists and gets `null`.

**Terminate the namespace line with a semicolon.** `game.js` exports nothing, so
it is a bare IIFE rather than an assignment. Without the semicolon:

```js
var SnakeGame = SnakeGame || {}   // <- missing ;

(function () { /* the whole game */ })()
```

JavaScript does not insert a semicolon before `(`, so this parses as
`var SnakeGame = SnakeGame || ({}(function(){...})())`. The four files loaded
earlier already set `SnakeGame`, so `||` short-circuits and **the entire game is
never evaluated** - no error, no output, a blank board.

## When this approach is preferable to ES modules

Reach for namespaced classic scripts when:

- **The page must open from `file://`.** Demos, offline tools, a game you want to
  double-click, anything mailed as a zip or dropped on a USB stick. This is the
  decisive case - modules simply cannot do it.
- **You want zero build tooling.** No `package.json`, no `node_modules`, no
  bundler, no rebuild after editing. Edit a file, refresh, done.
- **The project is small and the dependency graph is shallow.** Six files in a
  fixed order is easy to hold in your head. Fifty is not.
- **You are dropping a script onto a page you do not control** - a CMS template,
  a legacy page, an email-rendered preview - where you cannot add a build step or
  guarantee module support.
- **You need to support genuinely old browsers.** Modules need a reasonably
  modern engine; `<script defer>` works essentially everywhere.

## When ES modules are the better choice

Go back to `import`/`export` when:

- **The project is already served over http/https** and has, or can have, a dev
  server. Then the CORS restriction never applies and modules cost nothing.
- **The dependency graph is non-trivial.** Modules declare their own
  dependencies; with classic scripts *you* maintain the order by hand in HTML,
  and getting it wrong yields a runtime `undefined` rather than a clear error.
- **You want tooling to help.** Tree-shaking, bundling, static analysis, "find
  all references", circular-import detection and unused-export warnings all rely
  on real `import` statements. The namespace pattern is opaque to them.
- **You are publishing a library** others will consume - `import` is what they
  will expect.
- **Name collisions are likely or the team is large.** Modules give each file its
  own scope for free; the namespace pattern relies on everyone remembering the
  IIFE.
- **You want strict mode by default and top-level `await`.** Modules give both;
  classic scripts give neither.

The short version: ES modules are the better default, and this project is a
deliberate exception - it optimises for "double-click and play" over everything
else.
