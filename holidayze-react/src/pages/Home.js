import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filter, setFilter] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/hotels`);
        setHotels(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHotels();
    console.log(hotels);
  }, []);

  const handleFilter = (e) => {
    let filteredHotels = hotels.filter((hotel) => {
      return hotel.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilter(filteredHotels);
    setIsFiltered(true);
  };
  return (
    <div className="home">
      <div>
        <h1>Find your accommodation in Bergen now</h1>
      </div>
      <div>
        <h2>Search Hotel</h2>
        <input type="text" onChange={handleFilter} />
        <select name="names" id="">
          {hotels?.map((hotel, idx) => {
            return (
              <option key={idx} value={hotel.name}>
                {hotel.name}
              </option>
            );
          })}
          <option value={hotels}></option>
        </select>
        <button>Go</button>
      </div>
    </div>
  );
};

export default Home;
