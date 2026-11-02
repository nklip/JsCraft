// Booking a table(the component for the table reservations page)
import React, {useState, useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { parseISO, startOfDay, subDays} from 'date-fns';

import {
    Box,
    Button,
    Center,
    Field,
    Heading,
    Input,
    NativeSelect,
    Textarea,
    VStack,
  } from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

import {useAlertContext} from "../hooks/alertContext";
import useSubmit from "../hooks/useSubmit";

function Booking() {
    const [excludedDates, setExcludedDates] = useState([]);
    const [booking, setBooking] = useState([]);
    const {isLoading, response, submit} = useSubmit();
    const {onOpen} = useAlertContext();

    const yupValidationSchema = Yup.object({
        name:     Yup.string()
                  .label("name")
                  .required('Required Full Name'),
        email:    Yup.string()
                  .label("email")
                  .email('Invalid email address')
                  // yup 1's email() matches the browser's check, which accepts
                  // a domain without a dot ("user@localhost"); yup 0.32 did not.
                  .matches(/@[^@\s]+\.[^@\s]+$/, { message: 'Invalid email address', excludeEmptyString: true })
                  .required('Required Email address'),
        phone:    Yup.string()
                  .label("phone")
                  .matches('^[0-9]{11}$', 'Phone number should consist of 11 numbers')
                  .required('Required phone number'),
        type:     Yup.string()
                  .label("type")
                  .required('Required type of reservation'),
        date:     Yup.string()
                  .label("date")
                  .required('Required date'),
        guests:   Yup.string()
                  .label("guests")
                  .matches('^[1-9][0-9]?$|^100$', 'Please specify the amount of guests from 1 to 100')
                  .required('Required the amount of guests'),
        comment:  Yup.string()
                  .label("comment")
                  .min(25, "Your comment must be at least 25 characters!")
                  .required('Please provide your comment')
    });

    const fetchBooking = () => {
      let url = import.meta.env.VITE_DB + "/booking";

      // GET request
      fetch(url)
        .then((response) => response.json())
        .then((data) => setBooking(data))
        .catch((error) => console.log(error));
    };

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          phone: '',
          type: 'business',
          date: new Date(),
          guests: '',
          comment: ''
        },

        validationSchema: yupValidationSchema,

        onSubmit: (values) => {

          // simulate backend
          submit("/booking", values);

          fetchBooking(); // reload booking
        },
    });

    useEffect(() => {
      fetchBooking();
    }, []);

    useEffect(() => {
      // we get booking from fetchBooking()
      let bookingArray = Array.from(booking);

      // transform booking text date into excluded dates
      let dates = new Set(bookingArray.map(item => startOfDay(parseISO(item.date)).getTime()));

      // set excluded dates
      setExcludedDates(dates);
    }, [booking]);

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
      <Center>
        <VStack w="1024px" p={8} alignItems="center">
          <Heading as="h1" size={{ base: "3xl", lg: "4xl" }}>
            Reserve a table
          </Heading>
          <Box p={6} rounded="md" w="100%" alignItems="center">
            {/* noValidate hands validation to Yup. Without it the browser
                blocks submit on <input type="email"> and shows its own native
                bubble, so the custom messages below never appeared. */}
            <form onSubmit={formik.handleSubmit} noValidate>
              <VStack gap={4}>

                <Field.Root invalid={Boolean(formik.touched.name && formik.errors.name)}>
                  <Field.Label htmlFor="fullName">Full name</Field.Label>
                  <Input
                    id="fullName"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  <Field.ErrorText>{formik.errors.name}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={Boolean(formik.touched.email && formik.errors.email)}>
                  <Field.Label htmlFor="email">Email</Field.Label>
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

                <Field.Root invalid={Boolean(formik.touched.phone && formik.errors.phone)}>
                  <Field.Label htmlFor="phone">Phone number</Field.Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  <Field.ErrorText>{formik.errors.phone}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={Boolean(formik.errors.type)}>
                  <Field.Label htmlFor="type">Type of lunch</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      id="type"
                      name="type"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.type}
                      >
                        <option value="business">Business</option>
                        <option value="birthday">Birthday</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator color="inherit" />
                  </NativeSelect.Root>
                  <Field.ErrorText>{formik.values.type}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={Boolean(formik.touched.date && formik.errors.date)}>
                  <Field.Label htmlFor="date">Date</Field.Label>
                  <SingleDatepicker
                    id="date"
                    name="date"
                    // Version 3 of the date picker opens from a button. Its
                    // "input" variant opens only from a small icon, where the
                    // old picker opened on a click anywhere in the field, so
                    // the button stays and is styled like the inputs around it.
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
                    disabledDates={excludedDates}
                    minDate={subDays(new Date(), 1)}
                    date={formik.values.date}
                  />
                  <Field.ErrorText>{formik.errors.date}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={Boolean(formik.touched.guests && formik.errors.guests)}>
                  <Field.Label htmlFor="guests">Number of guests</Field.Label>
                  <Input
                    id="guests"
                    name="guests"
                    type="guests"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.guests}
                  />
                  <Field.ErrorText>{formik.errors.guests}</Field.ErrorText>
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
                  id="booking-submit"
                  type="submit"
                  color="yellow"
                  colorPalette="lemon"
                  width="full"
                  disabled={isLoading}
                  loading={isLoading}>
                    Submit
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Center>
    );
}

export default Booking;