# BMI
<sub>[Back to JsCraft](../README.md#content)</sub>

BMI stands for Body Mass Index. The body mass index (BMI) is a measure that uses your height and weight to work out if your weight is healthy.

## Adults
<sub>[Back to top](#bmi)</sub>

A BMI calculation in the healthy weight range is between 18.5 to 24.9.

For Black, Asian and some other minority ethnic groups, the healthy weight range is 18.5 to 23.

For people of White heritage, a BMI:
* below 18.5 is underweight
* between 18.5 and 24.9 is healthy
* between 25 and 29.9 is overweight
* of 30 or over is obese

Black, Asian and some other minority ethnic groups have a higher risk of developing some long-term conditions such as type 2 diabetes with a lower BMI. People from these groups with a BMI of:

* 23 or more are at increased risk (overweight)
* 27.5 or more are at high risk (obese)

## Children's BMI
<sub>[Back to top](#bmi)</sub>

For children and young people aged between 2 to 18 years old, the BMI calculator takes into account age and gender as well as height and weight.

A child's BMI is given as a "centile". The centile number shows how their BMI compares with other children of the same age and sex as a percentage.

For example, a girl on the 75th centile is heavier than 75 out of 100 other girls her age.

The BMI calculator works out if a child or young person is:
* underweight – on the 2nd centile or below
* a healthy weight – between the 2nd and 91st centiles
* overweight – 91st centile or above
* very overweight – 98th centile or above

See a GP if you're concerned about your child's weight. They may be able to refer you to your local healthy lifestyle programme for children, young people and families.

## Webpage
<sub>[Back to top](#bmi)</sub>

`index.html` is a small calculator UI for `bmi.js` - no server, no build step. Double-click `index.html` and it works. Pick Metric or Imperial, enter weight and height, choose an ethnicity group, and press Calculate (or Enter) to see the BMI value and its category.

## Day/night toggle
<sub>[Back to top](#bmi)</sub>

The sun/moon button switches the whole color palette instantly and remembers the choice (`localStorage`), overriding the system theme in either direction. Left untouched, the page just follows the OS setting instead.

## Hover for help
<sub>[Back to top](#bmi)</sub>

The "?" button, next to the theme toggle, explains the units for each mode and how ethnicity affects the healthy-weight thresholds, on hover. On a touchscreen, where there is no hover, tap it instead - tap again, press Escape, or tap elsewhere to close it.

## How to test
<sub>[Back to top](#bmi)</sub>

To run tests -> execute next command line: <b>npm run test</b>

## Notes
<sub>[Back to top](#bmi)</sub>

* bmi.js is a js file with simple js functions, used both by the Jest tests and directly by index.html as a plain `<script>`.
* bmi.test.js is a test file which contains Jest tests.
* index.html / css/style.css / js/app.js are the webpage that wraps bmi.js.
* js/theme-init.js applies a saved theme choice before first paint, avoiding a flash of the wrong theme.


