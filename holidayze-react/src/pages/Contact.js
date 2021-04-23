import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const Contact = () => {
  const [submit, setSubmit] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    contactSchema: yup.object().shape({
      name: yup.string().required("Please enter name"),
      email: yup.string().email("Invalid email").required("Please enter email"),
      subject: yup.string().required("Please enter subject"),
      message: yup.string().required("Please enter message"),
    }),
    onSubmit: async (values) => {
      setSubmit(true);
      setPostError(null);
      console.log(values);

      try {
        const response = await axios.post(`${BASE_URL}/contacts`, values);
        console.log(response.data);
        setSuccess(true);
      } catch (err) {
        console.log("error", err);
      } finally {
        setSubmit(false);
      }
    },
  });
  return (
    <div className="contact">
      <h1>Contact us</h1>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={submit}>
          <div>
            <label>Name</label>
            <input
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
            />
            {touched.name && errors.name ? <p>{errors.name}</p> : null}
          </div>
          <div>
            <label>Email</label>
            <input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
            />
            {touched.email && errors.email ? <p>{errors.email}</p> : null}
          </div>
          <div>
            <label>Subject</label>
            <input
              value={values.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              name="subject"
            />
            {touched.subject && errors.subject ? <p>{errors.subject}</p> : null}
          </div>
          <div>
            <label>Message</label>
            <textarea
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              name="message"
            />
            {touched.message && errors.name ? <p>{errors.name}</p> : null}
          </div>
          <button className="form__button btn" type="submit">
            {submit ? "Sending.." : "Send"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Contact;
