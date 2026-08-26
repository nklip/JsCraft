// Wires the page up to the plain functions in bmi.js (bmiCalculate,
// statusByBmi) - this file has no calculation logic of its own, it
// only reads the form, converts units, and renders the result.

(function () {
    var unitInputs = document.querySelectorAll('input[name="unit"]');
    var weightInput = document.getElementById("idWeight");
    var heightInput = document.getElementById("idHeight");
    var weightLabel = document.getElementById("idWeightLabel");
    var heightLabel = document.getElementById("idHeightLabel");
    var ethnicitySelect = document.getElementById("idEthnicity");
    var calculateButton = document.getElementById("idCalculateButton");
    var result = document.getElementById("idResult");
    var resultValue = document.getElementById("idResultValue");
    var resultStatus = document.getElementById("idResultStatus");

    var STATUS_LABEL = {
        underweight: "Underweight",
        healthy: "Healthy weight",
        overweight: "Overweight",
        obese: "Obese"
    };

    function currentUnit() {
        for (var i = 0; i < unitInputs.length; i++) {
            if (unitInputs[i].checked) {
                return unitInputs[i].value;
            }
        }
        return "metric";
    }

    // bmiCalculate() expects meters/kg for metric and inches/lb for
    // imperial. Height is collected in centimetres on the metric
    // side (people know their height in cm, not metres), so that's
    // the one value that needs converting before the call.
    function updateLabels() {
        var imperial = currentUnit() === "imperial";
        weightLabel.textContent = imperial ? "Weight (lb)" : "Weight (kg)";
        heightLabel.textContent = imperial ? "Height (in)" : "Height (cm)";
    }

    function showError(message) {
        result.classList.add("is-visible");
        resultValue.textContent = "";
        resultStatus.textContent = "";
        resultStatus.className = "result__status";
        var error = document.createElement("p");
        error.className = "result__error";
        error.textContent = message;
        resultValue.appendChild(error);
    }

    function calculate() {
        var weight = parseFloat(weightInput.value);
        var height = parseFloat(heightInput.value);

        if (!weight || !height || weight <= 0 || height <= 0) {
            showError("Enter a weight and height greater than zero.");
            return;
        }

        var imperial = currentUnit() === "imperial";
        var heightForCalc = imperial ? height : height / 100;

        var bmi = bmiCalculate(weight, heightForCalc, imperial);
        var isWhite = ethnicitySelect.value === "white";
        var status = statusByBmi(bmi, isWhite);

        result.classList.add("is-visible");
        resultValue.textContent = bmi;
        resultStatus.textContent = STATUS_LABEL[status] || status;
        resultStatus.className = "result__status " + status;
    }

    for (var i = 0; i < unitInputs.length; i++) {
        unitInputs[i].addEventListener("change", updateLabels);
    }
    calculateButton.addEventListener("click", calculate);

    // Enter in either number field should calculate, same as
    // pressing the button - there's no <form> here to give Enter
    // that behaviour for free.
    [weightInput, heightInput].forEach(function (input) {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                calculate();
            }
        });
    });

    updateLabels();
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
    var STORAGE_KEY = "bmi-theme";

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
