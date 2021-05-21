import { useEffect, useState, useContext } from "react";
import { BASE_URL } from "../utils/constants";
import useAxios from "../utils/useAxios";
import DeleteButton from "../components/DeleteButton";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const Enquiries = () => {
  const [enquiry, setEnquiry] = useState([]);
  const [loader, setLoader] = useState(true);
  const http = useAxios();
  const history = useHistory();
  const [auth] = useContext(AuthContext);

  const param = "bookings";

  if (!auth) {
    history.push("/login");
  }

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await http.get(`${BASE_URL}/${param}`);
        setEnquiry(response.data.reverse());
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEnquiries();
  }, []);
  return (
    <div className="enquiries">
      <Link className="enquiries__link" to="/admin">
        Back
      </Link>
      {loader ? (
        <div className="loader">
          <CircularProgress style={{ placeItems: "center" }} />
        </div>
      ) : (
        <>
          {enquiry?.map((enq) => {
            const priceTotal = enq.price * enq.nights;
            return (
              <div className="enquiries__container" key={enq.id}>
                <div>
                  <label className="enquiries__label">Hotel name:</label>
                  <p className="enquiries__output">{enq.hotel_name}</p>
                </div>
                <div>
                  <label className="enquiries__label">Guest name:</label>
                  <p className="enquiries__output">{enq.name}</p>
                </div>
                <div>
                  <label className="enquiries__label">Check-in:</label>
                  <p className="enquiries__output">{enq.date}</p>
                </div>
                <div>
                  <label className="enquiries__label">Nights:</label>
                  <p className="enquiries__output">{enq.nights}</p>
                </div>
                <div>
                  <label className="enquiries__label">Adults:</label>
                  <p className="enquiries__output">{enq.adults}</p>
                </div>
                <div>
                  <label className="enquiries__label">Children:</label>
                  <p className="enquiries__output">{enq.children}</p>
                </div>
                <div>
                  <label className="enquiries__label">Price pr/n:</label>
                  <p className="enquiries__output">{enq.price}kr</p>
                </div>
                <div>
                  <label className="enquiries__label">Total price:</label>
                  <p className="enquiries__output enquiries__total">
                    {priceTotal}kr
                  </p>
                </div>
                <div>
                  <DeleteButton
                    className="enquiries__btn"
                    param={param}
                    id={enq.id}
                  />
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Enquiries;
