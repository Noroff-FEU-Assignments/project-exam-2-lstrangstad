import { useContext, useState } from "react";
import { BASE_URL } from "../utils/constants";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "../utils/useAxios";
import { yupResolver } from "@hookform/resolvers/yup";
import { addSchema } from "../utils/schemas";

const Add = () => {
  const [hotel, setHotel] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [auth] = useContext(AuthContext);
  const http = useAxios();
  const history = useHistory();

  if (!auth) {
    history.push("/login");
  }

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(addSchema),
  });

  const onSubmit = async (data) => {
    setSubmit(true);
    setPostError(null);
    console.log(data);

    try {
      const response = await http.post(`${BASE_URL}/hotels`, data);
      console.log(response.data);
      setHotel(response.data);
      setSuccess(true);
    } catch (err) {
      console.log("error", err);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="add">
      <h1 className="add__heading">Add Establishment</h1>
      <div>
        <form className="add__form" onSubmit={handleSubmit(onSubmit)}>
          {postError && <p>{postError}</p>}
          <fieldset className="add__field" disabled={submit}>
            {success ? (
              <p className="form__success">
                Added new accomodation successfully
              </p>
            ) : null}
            <div className="add__box">
              <label className="add__label">Establishment name</label>
              <input
                className="add__input"
                name="name"
                placeholder="name..."
                ref={register}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div className="add__box">
              <label className="add__label">Description</label>
              <textarea
                className="add__input"
                name="description"
                placeholder="Description of establishment..."
                ref={register}
              />
              {errors.description && <p>{errors.description.message}</p>}
            </div>
            <div className="add__box">
              <label className="add__label">Price</label>
              <input
                className="add__input"
                name="price"
                placeholder="1999..."
                ref={register}
              />
              {errors.price && <p>{errors.price.message}</p>}
            </div>
            <div className="add__box">
              <label className="add__label">Rating</label>
              <input
                className="add__input"
                name="rating"
                placeholder="Rating (9.5)"
                ref={register}
              />
              {errors.rating && <p>{errors.rating.message}</p>}
            </div>
            <div className="add__box">
              <label className="add__label">Image</label>
              <input
                className="add__input"
                name="image"
                placeholder="Image URL..."
                ref={register}
              />
              {errors.image && <p>{errors.image.message}</p>}
            </div>
            <div className="add__box">
              <label className="add__label">Address</label>
              <input
                className="add__input"
                name="adress"
                placeholder="Kong Oscars Gate 33..."
                ref={register}
              />
              {errors.adress && <p>{errors.adress.message}</p>}
            </div>
            <button className="add__button btn" type="submit">
              {submit ? "Adding..." : "Add"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Add;
