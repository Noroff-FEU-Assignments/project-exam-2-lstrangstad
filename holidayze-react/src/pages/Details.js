import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import TransitionsModal from "../components/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";

const Details = () => {
  const [hotel, setHotel] = useState([]);
  const { id } = useParams();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      const response = await axios.get(`${BASE_URL}/hotels/${id}`);
      setHotel(response.data);
      setLoader(false);
    };
    fetchHotel();
  }, []);

  return (
    <div className="details">
      {loader ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="details__container">
          <div className="details__image-container">
            <img
              className="details__image"
              src={hotel.image}
              alt={hotel.name}
            />
          </div>
          <div className="details__content">
            <div>
              <h1 className="details__title">{hotel.name}</h1>
              <p className="details__location">{hotel.location}</p>
              <div className="details__rating">{hotel.rating}</div>
            </div>
            <div>
              <p className="details__price">
                <span className="details__number">{hotel.price}</span>kr/night
              </p>
              <TransitionsModal name={hotel.name} price={hotel.price} />
            </div>
          </div>
          <div className="details__overview">
            <h2 className="details__heading">Overview</h2>
            <p className="details__description">{hotel.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
