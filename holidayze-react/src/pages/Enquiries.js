import { useEffect, useState, useContext } from "react";
import { BASE_URL } from "../utils/constants";
import useAxios from "../utils/useAxios";
import DeleteButton from "../components/DeleteButton";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const Enquiries = () => {
  const [enquiry, setEnquiry] = useState([]);
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
      } catch (err) {
        console.log(err);
      }
    };
    fetchEnquiries();
  }, []);
  return (
    <div>
      <Link to="/admin">Back</Link>
      {enquiry?.map((enq) => {
        const priceTotal = enq.price * enq.nights;
        return (
          <div className="enquiries" key={enq.id}>
            <label className="enquiries__label">Hotel name</label>
            <p className="enquiries__output">Hotel name: {enq.hotel_name}</p>
            <p className="enquiries__output">Guest name: {enq.name}</p>
            <p className="enquiries__output">Check-in{enq.date}</p>
            <p className="enquiries__output">Nights: {enq.nights}</p>
            <p className="enquiries__output">Adults: {enq.adults}</p>
            <p className="enquiries__output">Children: {enq.children}</p>
            <p className="enquiries__output">Price: {enq.price}kr</p>
            <p className="enquiries__output">Sub total: {priceTotal}kr</p>
            <DeleteButton param={param} id={enq.id} />
          </div>
        );
      })}
    </div>
  );
};

export default Enquiries;
