import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import Modal from "../components/Modal";

const Details = () => {
  const [hotel, setHotel] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchHotel = async () => {
      const response = await axios.get(`${BASE_URL}/hotels/${id}`);
      setHotel(response.data);
      console.log(response.data);
    };
    fetchHotel();
  }, []);

  return (
    <div>
      <div>
        <img src={hotel.image} alt="" />
      </div>
      <div>
        <h1>{hotel.name}</h1>
        <p>{hotel.location}</p>
        <strong>{hotel.price}</strong>
        <div>{hotel.rating}</div>
        <Modal />
      </div>
      <div>
        <h2>Overview</h2>
        <p>{hotel.description}</p>
      </div>
    </div>
  );
};

export default Details;
