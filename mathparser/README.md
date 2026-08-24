# Mathparser
<sub>[Back to JsCraft](../README.md#content)</sub>

Mathparser is a simple webpage which demonstrates how you could create your own calculator using pure JavaScript.

Originally built in 2012; the UI below was refreshed since. Still just one HTML file plus `mathparser.js` - no server, no build step, no framework. Double-click `index.html` and it works.

## Design
<sub>[Back to top](#mathparser)</sub>

A single centered card, styled entirely with plain CSS custom properties - no external fonts, icons or frameworks. The expression field is monospace; the result reads like a small LCD screen. Type an expression and press Enter, or click Calculate.

## Day/night toggle
<sub>[Back to top](#mathparser)</sub>

The sun/moon button switches the whole color palette instantly and remembers the choice (`localStorage`), overriding the system theme in either direction. Left untouched, the page just follows the OS setting instead.

## Hover for syntax help
<sub>[Back to top](#mathparser)</sub>

The "?" button, immediately to the right of the theme toggle, shows the supported operators and a couple of usage notes on hover. On a touchscreen, where there is no hover, tap it instead - tap again, press Escape, or tap elsewhere to close it.
