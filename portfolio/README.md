# Portfolio
<sub>[Back to JsCraft](../README.md#content)</sub>

This project was done for <b>'Meta Front-End Developer Professional Certificate'</b> and demonstrates the React App and it's integration with next libraries.

## Content
<sub>[Back to top](#portfolio)</sub>

* [fontawesome](#fontawesome) 
* [chakra](#chakra) 
* [formik](#formik)

### Fontawesome
<sub>[Back to top](#portfolio)</sub>

<b>Font Awesome</b> is a popular icon library that provides scalable vector icons that can be customized with CSS. 

#### Imports:
```js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
```

#### Creating an icon dataset:
```js
const socials = [
  {
    key: 1,
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    key: 2,
    icon: faGithub,
    url: "https://github.com",
  },
  {
    key: 3,
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    key: 4,
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    key: 5,
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];
```

#### Displaying icons:
```js
<nav>
    {socials.map(item => (
      <a key={item.key} href={item.url} className="headerIcon">
        <FontAwesomeIcon icon={item.icon} size="2x"/>
      </a>
    ))}
</nav>
```

### Chakra
<sub>[Back to top](#portfolio)</sub>

<b>Chakra</b> UI is a simple, modular and accessible component library that provides you with the building blocks you need for your React applications. 

#### Imports
```js
import { Avatar, Heading, VStack } from "@chakra-ui/react";
```

#### Usage
```js
  <Avatar name="Nick Jonas" src="https://i.pravatar.cc/150?img=3" size="6xl"/>
  <Heading>{greeting}</Heading>
  <VStack>
    <Heading>{bio1}</Heading>
    <Heading>{bio2}</Heading>
  </VStack>
```

### Formik
<sub>[Back to top](#portfolio)</sub>

Formik is the world's most popular open source form library for React and React Native.

#### resetForm
Pass resetForm as a parameter to your onSubmit function. 
That should give your function access to the resetForm method from Formik. 
If you want to use any methods from the formik library inside your onSubmit function, first pass a parameter to the function so you can have access to the formik method.

#### Create formik + yup hook
```js
  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      type: 'hireMe',
      comment: ''
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
                    .label("Name")
                    .required('Required'),
      email:     Yup.string()
                    .label("Email Address")
                    .email('Invalid email address')
                    .required('Required'),
      type:      Yup.string()
                    .label("Type of enquiry")
                    .required('Required'),
      comment:   Yup.string()
                    .label("Your message")
                    .min(25, "Must be at least 25 characters!")
                    .required('Required')
    }),

    onSubmit: (values) => {
      submit("http://localhost.me", values);
    },
  });

  // async update after formik->submit finishes it's work
  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === 'success') {
        formik.resetForm();
      }
    }
  }, [response]);
```

#### OnSubmit
```js
  <form onSubmit={formik.handleSubmit}>
```

#### Input

```js
  <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
    <FormLabel htmlFor="firstName">Name</FormLabel>
    <Input
      id="firstName"
      name="firstName"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.firstName}
    />
    <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
  </FormControl>
```
