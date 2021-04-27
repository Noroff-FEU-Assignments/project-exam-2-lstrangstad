import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
});

export const bookingSchema = yup.object().shape({
  name: yup.string().required("required"),
  date: yup.date().required("required"),
  nights: yup.number().required("required"),
  Persons: yup.number().required("required"),
});

export const addSchema = yup.object().shape({
  name: yup.string().required("Please enter name of accomodation"),
  description: yup
    .string()
    .required("Please enter description of accomodation"),
  price: yup.number().required("Please enter price of accomodation"),
  image: yup.string().required("Please enter img of accomodation"),
  adress: yup.string().required("Please enter address of accomodation"),
  rating: yup.string().required("Please enter rating of accomodation"),
});

export const contactSchema = yup.object().shape({
  name: yup.string().required("Please enter name"),
  email: yup.string().email("Invalid email").required("Please enter email"),
  subject: yup.string().required("Please enter subject"),
  message: yup.string().required("Please enter message"),
});
