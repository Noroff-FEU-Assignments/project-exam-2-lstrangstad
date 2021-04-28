import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "../utils/schemas";
import { BASE_URL } from "../utils/constants";
import useAxios from "../utils/useAxios";

const myModal = () => {};

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const http = useAxios();
  const [submit, setSubmit] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(bookingSchema),
  });

  const onSubmit = async (data) => {
    setSubmit(true);
    setPostError(null);
    console.log(data);

    try {
      const response = await http.post(`${BASE_URL}/bookings`, data);
    } catch (err) {
      console.log("error", err);
      setPostError(err.toString());
    } finally {
      setSubmit(true);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [startDate, setStartDate] = useState(new Date());

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Book now</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {postError && <p className="add__error">{postError}</p>}
        <fieldset disabled={submit}>
          <label>Name</label>
          <input type="text" name="name" ref={register} />
          {errors.name && <p>{errors.name.message}</p>}
          <input
            onInput={(e) => setStartDate(e.target.value)}
            id="startdate"
            type="date"
            name="date"
            ref={register}
            required
          />

          <label>Nights</label>
          <input type="number" name="nights" ref={register} />
          {errors.nights && <p>{errors.nights.message}</p>}
          <label>Persons</label>
          <input type="number" name="Persons" ref={register} />
          {errors.Persons && <p>{errors.Persons.message}</p>}
          <button>Send</button>
        </fieldset>
      </form>
    </div>
  );

  console.log(startDate);
  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Book now
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
