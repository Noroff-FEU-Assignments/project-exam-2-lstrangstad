import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Card from "../components/Card";

const Stays = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(function () {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/hotels`);
        setHotels(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHotels();
  }, []);
  console.log(hotels);
  return (
    <div className="stays">
      <h1 className="stays__header">Our hotels</h1>
      <>
        {hotels.map((hotel) => {
          return <Card key={hotel.id} {...hotel} />;
        })}
      </>
    </div>
  );
};

export default Stays;
