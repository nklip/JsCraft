function bmiCalculate(weight, height, isImperial = false) {
    const result = weight / (height * height);
    if (isImperial) {
        return Math.round(result * 703 * 100) / 100;
    } else {
        return Math.round(result * 100) / 100;
    }
}

function statusByBmi(bmi, isWhite = true) {
    return isWhite ? whiteStatusByBmi(bmi) : nonWhiteStatusByBmi(bmi);
}

function whiteStatusByBmi(bmi) {
    if (bmi < 18.5) {
        return "underweight"
    } else if (18.5 <= bmi && bmi < 24.9) {
        return "healthy";
    } else if (24.9 <= bmi && bmi < 30) {
        return "overweight";
    } else if (30 <= bmi) {
        return "obese";
    }
}

function nonWhiteStatusByBmi(bmi) {
    if (bmi < 18.5) {
        return "underweight"
    } else if (18.5 <= bmi && bmi < 23) {
        return "healthy";
    } else if (23 <= bmi && bmi < 27.5) {
        return "overweight";
    } else if (27.5 <= bmi) {
        return "obese";
    }
}

// Guarded so this same file works both under Jest/Node (require, as the
// tests do) and as a plain <script src="bmi.js"> on the webpage, where
// `module` does not exist and would otherwise throw a ReferenceError.
if (typeof module !== "undefined") {
    module.exports = {bmiCalculate, statusByBmi};
}