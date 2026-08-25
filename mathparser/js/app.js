function calculateExpressionOnClick() {
    var expressionValue = document.getElementById("idExpressionText").value;
    var calculator = new Calculator();
    var text = calculator.calculate(expressionValue);

    console.log("Result: " + text);
    document.getElementById("idResult").value = text
}

// Enter has no default behaviour on a bare <input> outside a <form>,
// so it did nothing. This makes it press-and-release the Calculate
// button, both visually and functionally: keydown shows the same
// pressed look as a mouse click (button:active), keyup releases it
// and runs the calculation - wherever focus happens to be.
//
// preventDefault() on keydown is deliberate even when the button
// itself is focused: a native <button> already activates on Enter
// in most browsers, and without suppressing that, a keypress there
// would fire the calculation twice - once natively, once from this
// handler. This keeps the handler below as the single source of
// the click, so it behaves the same in every browser regardless of
// what element currently has focus.
(function () {
    var button = document.getElementById("idExpressionButton");

    document.addEventListener("keydown", function (event) {
        if (event.key !== "Enter") {
            return;
        }
        event.preventDefault();
        button.classList.add("is-pressed");
    });

    document.addEventListener("keyup", function (event) {
        if (event.key !== "Enter") {
            return;
        }
        event.preventDefault();
        button.classList.remove("is-pressed");
        button.click();
    });
})();

// The "?" help button. CSS alone already reveals the tooltip on
// :hover and on keyboard :focus-visible, so this script is not
// what makes it appear - it exists for the one thing CSS cannot
// do: touchscreens have no hover state, so without a tap target
// a touch user could never see the tooltip at all. Tapping the
// button pins it open (.is-visible) until it is tapped again,
// Escape is pressed, or the user taps elsewhere.
(function () {
    var helpButton = document.getElementById("idHelpButton");
    var tooltip = document.getElementById("idHelpTooltip");

    function setOpen(open) {
        tooltip.classList.toggle("is-visible", open);
        helpButton.classList.toggle("is-open", open);
        helpButton.setAttribute("aria-expanded", open ? "true" : "false");
    }

    helpButton.addEventListener("click", function (event) {
        event.stopPropagation();
        setOpen(!tooltip.classList.contains("is-visible"));
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && tooltip.classList.contains("is-visible")) {
            setOpen(false);
            // blur, not focus: the CSS rule below also reveals the
            // tooltip while the button is focused, so refocusing
            // it here would undo the close on the very same frame
            helpButton.blur();
        }
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".help-wrap")) {
            setOpen(false);
        }
    });
})();

// Day/night toggle. style.css already knows how to render both an
// OS-driven and an explicitly-chosen theme (see its data-theme rules),
// and theme-init.js already applies a saved choice before first paint.
// This is just the button: it flips data-theme on <html>, keeps its
// own icon and aria-pressed in sync, and remembers the choice.
(function () {
    var root = document.documentElement;
    var toggle = document.getElementById("idThemeToggle");
    var STORAGE_KEY = "mathparser-theme";

    // "Explicit" here means either the user already toggled once
    // this visit, or theme-init.js applied a saved value. Without
    // either, there is no data-theme attribute yet and the OS
    // setting is what is actually in effect.
    function effectiveTheme() {
        var explicit = root.getAttribute("data-theme");
        if (explicit === "light" || explicit === "dark") {
            return explicit;
        }
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    function syncButton(theme) {
        toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
        toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }

    // Reflects whatever is already in effect without writing a
    // data-theme attribute - a fresh visit that is only
    // following the OS should stay that way (and keep tracking
    // OS changes) until the user actually clicks.
    syncButton(effectiveTheme());

    toggle.addEventListener("click", function () {
        var next = effectiveTheme() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        syncButton(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch (error) {
            // ignore - e.g. Safari private browsing can throw on setItem
        }
    });
})();
