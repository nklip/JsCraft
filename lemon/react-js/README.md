# Little Lemon - React JS implementation
<sub>[Back to Little Lemon](../README.md#content)</sub>

This project was done as part of <b>Meta-Front End Developer Professional Certificate</b>

A <b>Single Page Application</b> is a website or web application that dynamically rewrites a current web page with new data from the web server, instead of the default method of a web browser loading entire new pages.

## Start up
<sub>[Back to top](#little-lemon---react-js-implementation)</sub>

1. Start up json-server
```bash
npm run server
```

2. Start up React
```bash
npm start
```

This app is built with **Vite**, not create-react-app. `npm start` and
`npm run dev` both launch the dev server; `npm run build` produces `build/`,
and `npm test` runs the suite under Vitest.

## Content
<sub>[Back to top](#little-lemon---react-js-implementation)</sub>

* [How to create a DB mock using json-server](#how-to-create-a-db-mock-using-json-server)
* [How to create a test mocking HTTP requests using testing-library](#how-to-create-a-test-mocking-http-requests-using-testing-library)
* [How to create and share global properties](#how-to-create-and-share-global-properties)
* [How to add a custom color for a button](#how-to-add-a-custom-color-for-a-button)
* [How to update date in Formik](#how-to-update-date-in-formik)
* [TODOs](#todos)

### How to create a DB mock using json-server
<sub>[Back to top](#little-lemon---react-js-implementation)</sub>

1. json-server is already a devDependency here, so no global install is needed

2. Add json data. For example, db.json

3. Run json-server
```bash
npm run server   # json-server --watch db.json --port 5555
```

### How to create a test mocking HTTP requests using testing-library
<sub>[Back to top](#little-lemon---react-js-implementation)</sub>

1. Import resources
```jsx
import { render, screen } from '@testing-library/react';

import Menu from '../components/Menu';
```

2. Create mock data
```jsx
const foodResponse = [
  {
    "id": 1,
    "dish" : "Nachos",
    "price": "$12",
    "desc" : "Cheese, onions, tomotoes."
  },
  {
    "id": 2,
    "dish" : "Tacos",
    "price": "$12",
    "desc" : "Chicken or beef with your choice of side."
  }
]
```

3. Intercept HTTP request
```jsx
async function mockFetch(url) {
  if (url.startsWith(import.meta.env.VITE_DB + "/food")) {
    return {
      ok: true,
      status: 200,
      json: async () => foodResponse,
    };
  } else if (url.startsWith(import.meta.env.VITE_DB + "/drinks")) {
    return {
      ok: true,
      status: 200,
      json: async () => drinksResponse,
    };
  } else if (url.startsWith(import.meta.env.VITE_DB + "/deserts")) {
    return {
      ok: true,
      status: 200,
      json: async () => desertsResponse,
    };
  }

  throw new Error(`Unhandled request: ${url}`);
}
```

4. Inject mocks
```jsx
beforeEach(() => {
  windowFetchSpy = jest.spyOn(window, 'fetch').mockImplementation(mockFetch);
})

afterEach(() => {
  jest.restoreAllMocks();
});
```

5. Create a test
```jsx
test('Menu page', async () => {
  render(<Menu />);

  expect(await screen.findByText('Nachos')).toBeInTheDocument();
  expect(await screen.findByText('Tacos')).toBeInTheDocument();

});
```

### How to create and share global properties
<sub>[Back to top](#little-lemon---react-js-implementation)</sub>

1. Create a .env file in the root of the React app
2. Add variables. Under Vite each variable must start with <b>VITE_</b> to be
exposed to the client. (Under create-react-app the prefix was <b>REACT_APP_</b>;
this project migrated, so the prefix and the accessor both changed.)
3. Read variables using <b>import.meta.env.VITE_</b>
```jsx
return (
  <div>
    <h1>
      We are using {import.meta.env.VITE_DATABASE}
    </h1>
  </div>
);
```

### How to add a custom color for a button
<sub>[Back to top](#little-lemon---react-js-implementation)</sub>

Chakra button component looks like:
```jsx
<Button
    type="submit"
    colorPalette="lemon"
    width="full"
    disabled={isLoading}
    loading={isLoading}>
    Submit
</Button>
```
Use the <b>colorPalette</b> prop to change the colours of the Button. You can set the value to any of the palettes in the theme, like gray, red, blue, or your own palette.

https://chakra-ui.com/docs/components/button

The colorPalette prop takes only a palette's name, so a colour of our own has to be added to the theme first.

Chakra UI 3 builds the theme with `createSystem`, which `src/lib/theme.js` does:
```jsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        lemon: { 500: { value: "#b2c3af" } },
      },
    },
    semanticTokens: {
      colors: {
        lemon: {
          solid: { value: "{colors.lemon.500}" },
          contrast: { value: "white" },
          fg: { value: "{colors.lemon.500}" },
          muted: { value: "{colors.lemon.500}" },
          subtle: { value: "{colors.lemon.500}" },
          emphasized: { value: "{colors.lemon.500}" },
          focusRing: { value: "{colors.lemon.500}" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
```

`App.jsx` then hands the system to the provider:
```jsx
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./lib/theme";

function App() {
  return (
    <ChakraProvider value={system}>
      ...
    </ChakraProvider>
  );
}
```

A colour alone is not enough for colorPalette. The palette also needs the semantic tokens
the components read: `solid` is the fill of a solid button and `contrast` the text on it.
The others serve the subtle, outline and ghost variants and the focus ring. Lemon has only
one shade, so every token except `contrast` points at it.

https://chakra-ui.com/docs/theming/customization/colors

Then we can use lemon color for our button.

### How to update date in Formik
<sub>[Back to top](#little-lemon---react-js-implementation)</sub>

Declare useFormik hook
```jsx
const formik = useFormik({
    initialValues: {
        fullName: '',
        email: '',
        phone: '',
        type: 'business',
        date: new Date(),
        guests: '',
        comment: ''
    },

    validationSchema: Yup.object({
        fullName: Yup.string()
                    .label("name")
                    .required('Required'),
        email:    Yup.string()
                    .label("email")
                    .email('Invalid email address')
                    .required('Required'),
        phone:    Yup.string()
                    .label("phone")
                    .matches('[0-9]{11,11}', 'Phone number should consist of 11 numbers')
                    .required('Required'),
        type:     Yup.string()
                    .label("type")
                    .required('Required'),
        date:     Yup.string()
                    .label('date')
                    .required(),
        guests:   Yup.string()
                    .label("guests")
                    .matches('^[1-9][0-9]?$|^100$', 'Please specify the amount of guests from 1 to 100')
                    .required('Required'),
        comment:  Yup.string()
                    .label("comment")
                    .min(25, "Must be at least 25 characters!")
                    .required('Required')
    }),

    onSubmit: (values) => {
        submit("http://localhost.me", values);
    },
});
```

Update date using Chakra library
```jsx
<Field.Root invalid={Boolean(formik.touched.date && formik.errors.date)}>
    <Field.Label htmlFor="date">Date</Field.Label>
    <SingleDatepicker
        id="date"
        name="date"
        propsConfigs={{
            triggerBtnProps: {
                variant: "outline",
                width: "100%",
                justifyContent: "flex-start",
                fontWeight: "normal",
            },
        }}
        type="date"
        format="yyyy-MM-dd"
        onDateChange={value => formik.setFieldValue('date', value)}
        onBlur={formik.handleBlur}
        minDate={new Date()}
        date={formik.values.date}
    />
    <Field.ErrorText>{formik.errors.date}</Field.ErrorText>
</Field.Root>
```

`chakra-dayzed-datepicker` 3 opens the calendar from a button. `triggerBtnProps` styles
that button like the inputs around it. Its `triggerVariant="input"` alternative opens the
calendar only from a small icon beside the field.

### TODOs

Add another picture in about and do overlapping + change z position by click on the picture.
