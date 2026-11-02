import React, {useEffect} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  NativeSelect,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();

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
                    // yup 1's email() matches the browser's check, which accepts
                    // a domain without a dot ("user@localhost"); yup 0.32 did not.
                    .matches(/@[^@\s]+\.[^@\s]+$/, { message: 'Invalid email address', excludeEmptyString: true })
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

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      gap={8}
    >
      <VStack w="1024px" p={8} alignItems="flex-start">
        <Heading as="h1" size={{ base: "3xl", lg: "4xl" }}>
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack gap={4}>

              <Field.Root invalid={Boolean(formik.touched.firstName && formik.errors.firstName)}>
                <Field.Label htmlFor="firstName">Name</Field.Label>
                <Input
                  id="firstName"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                <Field.ErrorText>{formik.errors.firstName}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={Boolean(formik.touched.email && formik.errors.email)}>
                <Field.Label htmlFor="email">Email Address</Field.Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <Field.ErrorText>{formik.errors.email}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={Boolean(formik.errors.type)}>
                <Field.Label htmlFor="type">Type of enquiry</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    id="type"
                    name="type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.type}
                    >
                      <option value="hireMe">Freelance project proposal</option>
                      <option value="openSource">
                        Open source consultancy session
                      </option>
                      <option value="other">Other</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator color="inherit" />
                </NativeSelect.Root>
                <Field.ErrorText>{formik.values.type}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={Boolean(formik.touched.comment && formik.errors.comment)}>
                <Field.Label htmlFor="comment">Your message</Field.Label>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.comment}
                />
                <Field.ErrorText>{formik.errors.comment}</Field.ErrorText>
              </Field.Root>

              <Button 
                type="submit" 
                colorPalette="purple"
                width="full"
                disabled={isLoading}
                loading={isLoading}>
                  Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
