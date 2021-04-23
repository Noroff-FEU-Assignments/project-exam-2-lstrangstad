import { useContext, useState } from "react";
import { BASE_URL } from "../utils/constants";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import useAxios from "../utils/useAxios";

const Add = () => {
  const [hotel, setHotel] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [auth] = useContext(AuthContext);
  const http = useAxios();
  const history = useHistory();

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
      description: "",
      price: "",
      image: "",
      adress: "",
      rating: "",
    },
    addSchema: yup.object().shape({
      name: yup.string().required("Please enter name of accomodation"),
      description: yup
        .string()
        .required("Please enter description of accomodation"),
      price: yup.number().required("Please enter price of accomodation"),
      img: yup.string().required("Please enter img of accomodation"),
      address: yup.string().required("Please enter address of accomodation"),
      rating: yup.string().required("Please enter rating of accomodation"),
    }),
    onSubmit: async (values) => {
      setSubmit(true);
      setPostError(null);
      console.log(values);

      try {
        const response = await http.post(`${BASE_URL}/hotels`, values);
        console.log(response.data);
        setHotel(response.data);
        setSuccess(true);
      } catch (err) {
        console.log("error", err);
      } finally {
        setSubmit(false);
      }
    },
  });
  return (
    <div>
      <h1>Add accomodation</h1>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          {postError && <p>{postError}</p>}
          <fieldset className="form__fieldset" disabled={submit}>
            {success ? (
              <p className="form__success">
                Added new accomodation successfully
              </p>
            ) : null}
            <div className="form__box">
              <input
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                placeholder="Occomodation name"
              />
              {touched.name && errors.name ? <p>{errors.name}</p> : null}
            </div>

            <div className="form__box">
              <input
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                name="description"
                placeholder="Description"
              />
              {touched.description && errors.description ? (
                <div>{errors.description}</div>
              ) : null}
            </div>
            <div className="form__box">
              <input
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                name="price"
                placeholder="Price"
              />
              {touched.price && errors.price ? <div>{errors.price}</div> : null}
            </div>
            <div className="form__box">
              <input
                value={values.rating}
                onChange={handleChange}
                onBlur={handleBlur}
                name="rating"
                placeholder="Rating (9.5)"
              />
              {touched.rating && errors.rating ? (
                <div>{errors.rating}</div>
              ) : null}
            </div>
            <div className="form__box">
              <input
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
                name="image"
                placeholder="Image"
              />
              {touched.image && errors.image ? <div>{errors.image}</div> : null}
            </div>
            <div className="form__box">
              <input
                value={values.adress}
                onChange={handleChange}
                onBlur={handleBlur}
                name="adress"
                placeholder="Address"
              />
              {touched.adress && errors.adress ? (
                <div>{errors.adress}</div>
              ) : null}
            </div>
            <button className="form__button btn" type="submit">
              {submit ? "Loggin in..." : "Login"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Add;
