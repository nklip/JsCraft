// Applies a saved theme choice before the page paints. Loaded this early
// and left un-deferred on purpose: as a classic synchronous <script>, the
// browser fetches and runs it (and only then continues parsing the rest of
// <head>, including the stylesheet) before anything is painted. If this ran
// later instead - alongside app.js, near the end of <body> - a saved "dark"
// preference on a light-OS machine would render light for a moment and then
// flip, which is the classic flash-of-wrong-theme.
//
// It only acts when a preference was saved; with nothing saved yet, style.css
// still follows the OS via prefers-color-scheme.
(function () {
    try {
        var saved = localStorage.getItem("mathparser-theme");
        if (saved === "light" || saved === "dark") {
            document.documentElement.setAttribute("data-theme", saved);
        }
    } catch (error) {
        // localStorage can throw (e.g. Safari private browsing) -
        // falling back to the OS theme is fine either way
    }
})();
