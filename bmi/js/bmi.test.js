const { bmiCalculate, statusByBmi } = require('./bmi');

test("test BMI", () => {
    expect(bmiCalculate(75, 1.75, false)).toBe(24.49);
});

test("test BMI in America", () => {
    expect(bmiCalculate(150, 65, true)).toBe(24.96);
});

test("white: 18.4 is underweigh", () => {
    expect(statusByBmi(18.4)).toBe('underweight');
});

test("white: 18.5 is healthy", () => {
    expect(statusByBmi(18.5)).toBe('healthy');
});

test("white: 24.8 is healthy", () => {
    expect(statusByBmi(24.8)).toBe('healthy');
});

test("white: 24.9 is healthy", () => {
    expect(statusByBmi(24.9)).toBe('overweight');
});

test("white: 29.9 is healthy", () => {
    expect(statusByBmi(29.9)).toBe('overweight');
});

test("white: 30 is obese", () => {
    expect(statusByBmi(30)).toBe('obese');
});

test("nonWhite: 18.4 is underweigh", () => {
    expect(statusByBmi(18.4, false)).toBe('underweight');
});

test("nonWhite: 18.5 is healthy", () => {
    expect(statusByBmi(18.5, false)).toBe('healthy');
});

test("nonWhite: 22.9 is healthy", () => {
    expect(statusByBmi(22.9, false)).toBe('healthy');
});

test("nonWhite: 23 is healthy", () => {
    expect(statusByBmi(23, false)).toBe('overweight');
});

test("nonWhite: 27.4 is healthy", () => {
    expect(statusByBmi(27.4, false)).toBe('overweight');
});

test("nonWhite: 27.5 is obese", () => {
    expect(statusByBmi(27.5, false)).toBe('obese');
});