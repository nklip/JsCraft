# JsCraft

A collection of small, self-contained JavaScript and React projects. Each top-level
folder is an independent app with its own README — there is no shared build, no
workspace root, and no cross-project imports. Treat each one as its own codebase.

## Project families

Two kinds of project live here, and they follow **different** layout rules on purpose.
Decide which family a project belongs to before touching its structure.

### 1. Build-free static pages

`snake/`, `bmi/`, `mathparser/`, `lemon/vanilla-js/`

No bundler, no transpiler. The `.html` file the browser loads is the file in the repo.

```
project/
  index.html          documents at the root
  css/
  js/
    vendor/           third-party scripts, if any
  img/                only what the page actually loads
    originals/        unoptimised sources; never referenced by the page
  favicon.ico         root-mandated files stay at the root
  robots.txt
  README.md
```

**These must keep working when opened directly from `file://`.** That constraint is the
point of this family — it rules out ES module `import` between files, `fetch()` of local
JSON, and anything else that needs an origin. Scripts communicate through globals on
`window`, which is a deliberate trade, not an oversight.

`bmi/` has a `package.json`, but only for Jest. The page itself still runs unbuilt.

### 2. Bundled apps (Vite)

`weather/`, `portfolio/`, `lemon/react-js/`

```
project/
  index.html
  package.json
  vite.config.js
  public/             copied verbatim; stable, unhashed URLs
    favicon.ico  robots.txt  manifest.json
  src/
    main.jsx
    components/
    hooks/
    lib/
    assets/           imported by code; fingerprinted at build
  build/              generated output — never edit, never hand-fix
```

### 3. Node service

`tic-tac-toe-js/` — a server-rendered game with `src/`, `test/`, and `assets/{public,views}`.
Server-side layout, not comparable to the two browser families above.

## Conventions

### Layout

- **Documents at the root; resources in sibling folders by type.** Static projects only.
- **`src/` vs `public/` is a processing boundary, not a file-type split.** One question
  decides it: does code `import` the file, or does something reference it by literal
  string? Imported → `src/assets/`. Referenced by a path from JSON, an API, or an HTML
  attribute that must stay stable → `public/`. Prefer importing; `public/` is the
  exception. ([Vite](https://vite.dev/guide/assets))
- **Never introduce an `assets/` umbrella into a build-free project.** In Vite and Hugo,
  `assets/` is the name for *pipeline input*. Borrowing the word where no pipeline exists
  gives the folder a name that describes machinery the project does not have.
- **Cap nesting at three or four levels.** ([React](https://legacy.reactjs.org/docs/faq-structure.html))
- **Keep files that change together next to each other** — colocation. In bundled
  projects a component's styles belong beside the component, not in a global `css/`.

### Naming

- **React components: PascalCase**, file and folder. This is a hard requirement, not
  taste: React reads a lowercase tag as an HTML element and a capitalized one as a
  component, so `<profile />` and `<Profile />` mean different things.
  ([React](https://react.dev/learn/your-first-component))
- **Everything else: kebab-case** — `theme-init.js`, `weather-card.css`.
- **Asset filenames describe content**, lowercase and hyphenated: `logo.png`,
  `hours-icon.png`. Not `asset_16@4x.png`. A `@2x`/`@4x` suffix is an Apple/Android
  density convention with no meaning in a browser — the web equivalent is a `srcset`
  descriptor, and unless the file is actually wired into one, the suffix is noise.

### Images

Ship WebP; keep the source file in `img/originals/` so a re-encode never has to
start from an already-compressed copy. Nothing in `originals/` is referenced by the
page — if a filename appears in the HTML, it lives one level up.

Three rules, each learned from measuring rather than guessing:

- **Fix dimensions before format.** In `lemon/vanilla-js` two card graphics were stored
  at 2400px tall and displayed at 112px — roughly 460x more pixels than used. Resizing
  those to fit their slot saved 95%; converting them at full size would have saved 75%
  and left the real waste in place. Target 2x the CSS display size.
- **Lossless for flat art, lossy for photographs.** The wordmark encodes to 11K lossless
  at native size but 21K at q90 downscaled — resampling interpolates the flat colour
  runs and destroys what lossless compresses. Photos take `-q 82` without visible loss.
- **Cap, never enlarge.** Resizing to a fixed width upscaled two already-small photos and
  more than doubled them. Only downscale images that exceed the target.

Verify the output by eye before deleting anything, and re-measure rather than assuming a
format change helped.

Give every `<img>` a `width` and `height` so the browser reserves space before the file
arrives. **These attributes are also presentational hints**, so wherever CSS sets one axis
it must release the other to `auto` — otherwise the attribute wins and the image is
stretched. A `header img { width: 40rem }` with `height="546"` and no `height: auto`
rendered 640x546 instead of 640x175. Set `height: auto` where CSS drives the width, and
`width: auto` where CSS drives the height.

Images inside a tab that starts hidden get `loading="lazy"`; those visible on arrival must
not, or the page paints empty.

### CSS

- `rem` for sizing, so the page respects the reader's font size.
- Group a component's rules together; keep media queries next to what they modify.
- Where a rule exists to solve a non-obvious problem, say so in a comment. The
  `#menu, #about { display: none }` rule in `lemon/vanilla-js` is a good example — without
  the note, the next reader deletes it and reintroduces a flash of every tab at once.

### JavaScript

- `===`, never `==`.
- `const` by default, `let` when reassigned, never `var`.
- In bundled projects, ES modules. In static projects, globals — see the `file://`
  constraint above.

### Theme toggle

`bmi/` and `mathparser/` share a pattern worth repeating in any project that gains a
dark mode: a small synchronous `js/theme-init.js`, loaded **un-deferred in `<head>`
before the stylesheet**, applies the saved preference before first paint. Loading it
late causes a flash of the wrong theme. The reasoning is spelled out in the HTML comment
above the tag in both projects — keep that comment if you copy the pattern.

### Accessibility baseline

Non-negotiable for anything user-facing:

- Every `<img>` has an `alt` (empty `alt=""` if genuinely decorative).
- Exactly one `<h1>`; headings descend without skipping.
- Real heading elements, never `<b>` standing in for one.
- Interactive controls are reachable and operable by keyboard.

## Tooling

Standards that live only in a document decay. Prefer a linter over a rule written here.

| Tool | Enforces |
|---|---|
| `.editorconfig` | charset, LF, indent, final newline, trailing whitespace |
| Prettier | formatting, no build step needed |
| stylelint | invalid CSS |
| ESLint | `==`, undeclared globals, unused vars |
| html-validate | missing `alt`, heading order, bad nesting |

**stylelint needs `declaration-property-value-no-unknown` turned on explicitly.**
`stylelint-config-standard` (v36.0.1) does not include it, and without it invalid
declarations pass silently. Two of them — `text-align: auto` and `padding: auto` — sat
in `lemon/vanilla-js/css/style.css` for two years doing nothing. With the rule enabled,
both are caught on the first run.

## Working agreements

- **Verify in a browser, don't assert.** These are visual projects; a claim about
  rendering, fonts, or layout should be backed by a measurement or a screenshot. Serve
  over `http://localhost` rather than `file://` when checking, and hard-reload — stale
  CSS has produced false negatives here.
- **Don't add a build step to a build-free project** without saying so explicitly and
  getting agreement. It ends `file://` support and changes what the project demonstrates.
- **Don't edit `build/`.** It is generated.
- **A project may deviate** from anything above if its README says which rule and why.

## Why these choices

The layout rules are not invented here. They come from the reference implementations of
each family.

**Static projects are flat because HTML5 Boilerplate is flat.** Its published `dist/`
is `index.html`, `404.html`, `css/`, `js/` (with `js/vendor/`), `img/`, and `favicon.ico`
/ `robots.txt` / `site.webmanifest` at the root. That is the closest thing to a canonical
answer for a page with no build step, and `mathparser/` already matches it exactly.
h5bp also ships an `.editorconfig`, which is where that row of the tooling table comes from.

**An `assets/` umbrella was considered and rejected.** It reads as the tidier option, but
the research undercuts it. In Hugo, `assets/` is processed through the asset pipeline
while `static/` is copied verbatim; Hugo's own docs note `static/` used to do the job
`assets/` now does. In Vite the same boundary exists as `src/` versus `public/`. In both,
`assets/` earns its name by describing *what happens to the files inside it*. A project
with no pipeline has nothing for the name to mean, and the folder degrades into an extra
path segment. Jekyll, for its part, prescribes nothing — its docs treat `css/` and
`images/` as ordinary folders copied verbatim.

**The `src`/`public` rule is Vite's own**, quoted almost directly: put a file in `public/`
when it is never referenced from source, must keep its exact filename, or you don't want
to import it to get its URL — and otherwise prefer importing.

**PascalCase for components is a language-level constraint**, documented in React's own
"Your First Component": names "must start with a capital letter or they won't work."

**Colocation over any particular folder taxonomy** is React's stated guidance, which
explicitly declines to crown by-feature or by-type as superior and advises against deep
nesting. The principle transfers; the specific tree does not.

### Sources

- [Vite — Static Asset Handling](https://vite.dev/guide/assets)
- [Hugo — Directory Structure](https://gohugo.io/getting-started/directory-structure/)
- [Jekyll — Directory Structure](https://jekyllrb.com/docs/structure/)
- [HTML5 Boilerplate — published `dist/`](https://github.com/h5bp/html5-boilerplate/tree/main/dist)
- [React — Your First Component](https://react.dev/learn/your-first-component)
- [React — File Structure](https://legacy.reactjs.org/docs/faq-structure.html)
- [stylelint — declaration-property-value-no-unknown](https://stylelint.io/user-guide/rules/declaration-property-value-no-unknown/)
- [EditorConfig](https://editorconfig.org/)
