import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../utils/schemas";
import axios from "axios";

const Contact = () => {
  const [submit, setSubmit] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (values) => {
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
  };

  return (
    <div className="contact">
      <h1>Contact us</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {postError && <p>{postError}</p>}
        {success ? <p>Message sendt</p> : null}
        <fieldset disabled={submit}>
          <div>
            <label>Name</label>
            <input name="name" ref={register} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <label>Email</label>
            <input name="email" ref={register} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label>Subject</label>
            <input name="subject" ref={register} />
            {errors.subject && <p>{errors.subject.message}</p>}
          </div>
          <div>
            <label>Message</label>
            <textarea name="message" ref={register} />
            {errors.message && <p>{errors.message.message}</p>}
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
