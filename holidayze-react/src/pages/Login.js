import { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL, AUTH_PATH } from "../utils/constants";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const Login = () => {
  const [submit, setSubmit] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [, setAuth] = useContext(AuthContext);

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    loginSchema: yup.object().shape({
      identifier: yup.string().required("Please enter username"),
      password: yup.string().required("Please enter password"),
    }),
    onSubmit: async (values) => {
      setSubmit(true);
      setLoginError(null);
      console.log(values);

      try {
        const response = await axios.post(`${BASE_URL}${AUTH_PATH}`, values);
        console.log(response.data);
        setAuth(response.data);
        setSuccess(true);
      } catch (err) {
        console.log("error", err);
        setLoginError(err.toString());
      } finally {
        setSubmit(false);
      }
    },
  });

  return (
    <div>
      <h1>Admin login</h1>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          {loginError && <p>{loginError}</p>}
          <fieldset className="form__fieldset" disabled={submit}>
            {success ? (
              <p className="form__success">Successfully logged in</p>
            ) : null}
            <div className="form__box">
              <input
                value={values.identifier}
                onChange={handleChange}
                onBlur={handleBlur}
                name="identifier"
                placeholder="Username"
              />
              {touched.identifier && errors.identifier ? (
                <p>{errors.identifier}</p>
              ) : null}
            </div>

            <div className="form__box">
              <input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                placeholder="Password"
                type="password"
              />
              {touched.password && errors.password ? (
                <div>{errors.password}</div>
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

export default Login;
