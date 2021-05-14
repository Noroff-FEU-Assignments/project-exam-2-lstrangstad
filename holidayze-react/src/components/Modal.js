import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "../utils/schemas";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: "450px",
    width: "350px",
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [submit, setSubmit] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);
  const {
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      hotel_name: props.name,
      price: props.price,
      name: "",
      date: "",
      nights: "",
      adults: "",
      children: "",
    },
    bookingSchema: yup.object().shape({
      hotel_name: yup.string().required(),
      price: yup.number().required(),
      name: yup.string().required("required"),
      date: yup.date().required("required"),
      nights: yup.number().required("required"),
      adults: yup.number().required("required"),
      children: yup.number().required("required"),
    }),
    onSubmit: async (data) => {
      setSubmit(true);
      setPostError(null);
      console.log(data);

      try {
        const response = await axios.post(`${BASE_URL}/bookings`, data);
        console.log(response.data);
      } catch (err) {
        console.log("error", err);
        setPostError(err.toString());
      } finally {
        setSubmit(false);
      }
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(props.name);

  return (
    <div>
      <button className="details__btn" type="button" onClick={handleOpen}>
        Book now
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="modal">
              <h2 className="modal__header">Book now</h2>
              <form className="modal__form" onSubmit={handleSubmit}>
                {postError && <p className="add__error">{postError}</p>}
                <fieldset className="modal__field" disabled={submit}>
                  <input
                    className="modal__input"
                    value={props.name}
                    name="hotel_name"
                    onChange={handleChange}
                    type="hidden"
                  />
                  <input
                    className="modal__input"
                    value={props.price}
                    name="price"
                    onChange={handleChange}
                    type="hidden"
                  />
                  <div className="modal__input-box">
                    <label className="modal__label">Name: </label>
                    <input
                      className="modal__input"
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                  </div>
                  <div className="modal__input-box">
                    <label className="modal__label">Arrival: </label>
                    <input
                      className="modal__input"
                      onInput={(e) => setStartDate(e.target.value)}
                      id="startdate"
                      type="date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal__input-box">
                    <label className="modal__label">Nights: </label>
                    <input
                      className="modal__input"
                      type="text"
                      name="nights"
                      value={values.nights}
                      onChange={handleChange}
                    />
                    {errors.nights && <p>{errors.nights.message}</p>}
                  </div>
                  <div className="modal__input-box">
                    <label className="modal__label">Adults: </label>
                    <input
                      className="modal__input"
                      type="text"
                      name="adults"
                      value={values.adults}
                      onChange={handleChange}
                    />
                    {errors.adults && <p>{errors.adults.message}</p>}
                  </div>
                  <div className="modal__input-box">
                    <label className="modal__label">Children: </label>
                    <input
                      className="modal__input"
                      type="text"
                      name="children"
                      value={values.children}
                      onChange={handleChange}
                    />
                    {errors.children && <p>{errors.children.message}</p>}
                  </div>
                  <button className="modal__button">Send</button>
                </fieldset>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
