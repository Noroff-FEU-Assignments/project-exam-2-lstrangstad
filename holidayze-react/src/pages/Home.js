import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filter, setFilter] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [toggle, setToggle] = useState("closed");

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

    if (e.target.value === "" || filteredHotels.length === 0) {
      setToggle("closed");
    } else {
      setToggle("toggled");
    }
  };

  console.log(filter);

  return (
    <div className="home">
      <div className="home__headingbox">
        <h1 className="home__heading">
          Find your accommodation in Bergen now!
        </h1>
      </div>
      <div>
        <h2 className="home__subheader">Search Hotel</h2>
        <input className="home__input" type="text" onChange={handleFilter} />
        <div className={toggle}>
          {isFiltered ? (
            <div className="home__toggleInner">
              <ul className="home__list">
                {filter?.map((hotel) => {
                  return (
                    <li className="home__item" key={hotel.id}>
                      <Link
                        className="home__link"
                        style={{ display: "flex" }}
                        to={`/details/${hotel.id}`}
                      >
                        {hotel.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
