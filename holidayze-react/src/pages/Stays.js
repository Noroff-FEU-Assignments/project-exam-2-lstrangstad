import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Card from "../components/Card";
import CircularProgress from "@material-ui/core/CircularProgress";

const Stays = () => {
  const [hotels, setHotels] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(function () {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/hotels`);
        setHotels(response.data);
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHotels();
  }, []);
  console.log(hotels);
  return (
    <div className="stays">
      {loader ? (
        <div className="loader">
          <CircularProgress style={{ placeItems: "center" }} />
        </div>
      ) : (
        <>
          <h1 className="stays__header">Our hotels</h1>
          <div className="stays__container">
            {hotels.map((hotel) => {
              return <Card key={hotel.id} {...hotel} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Stays;
