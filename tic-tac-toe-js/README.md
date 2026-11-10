# tic-tac-toe-js
<sub>[Back to JsCraft](../README.md#content)</sub>

Node.js project. UI. Tic-tac-toe game.

## Dependencies

`package.json` sets `overrides` for `glob` (^14.0.4) and `minimatch` (^11.0.7).
minimatch below 11.0.1 carries a denial-of-service advisory
([GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)), and
mocha 12 and c8 12, the newest releases, still require minimatch 10 through glob 13.
glob 14 and minimatch 11 keep the API those tools call, and the test run and its
coverage report come out the same with the override as without it. Remove the
`overrides` block once mocha and c8 depend on minimatch 11.0.1 or later.

mocha 12 needs Node.js 22.12 or later.
