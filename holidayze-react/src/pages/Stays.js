import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Card from "../components/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import { HotelRounded } from "@material-ui/icons";

const Stays = () => {
  const [hotels, setHotels] = useState([]);
  const [filter, setFilter] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
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

  const handleFilter = (e) => {
    let filteredHotels = hotels.filter((hotel) => {
      return hotel.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilter(filteredHotels);
    setIsFiltered(true);
  };

  console.log(filter);

  return (
    <div className="stays">
      <h1 className="stays__header">Our hotels</h1>
      <input type="text" className="stays__search" onChange={handleFilter} />
      <select name="" id="">
        <option value="">All stays</option>
        <option value="">Hotel</option>
        <option value="">B&B</option>
        <option value="">Cabin</option>
      </select>
      {loader ? (
        <div className="loader">
          <CircularProgress style={{ placeItems: "center" }} />
        </div>
      ) : (
        <>
          {isFiltered ? (
            <div className="stays__container">
              {filter.length !== 0 ? (
                filter.map((hotel) => <Card key={hotel.id} {...hotel} />)
              ) : (
                <div>
                  <p>No Hotels is matching your search...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="stays__container">
              {hotels.map((hotel) => (
                <Card key={hotel.id} {...hotel} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Stays;
