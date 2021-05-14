import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const Admin = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [message, setMessage] = useState([]);

  const http = useAxios();
  const history = useHistory();
  const [auth] = useContext(AuthContext);

  if (!auth) {
    history.push("/login");
  }

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await http.get(`${BASE_URL}/bookings`);
        setEnquiries(response.data.reverse());
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEnquiries();

    const fetchMessages = async () => {
      try {
        const response = await http.get(`${BASE_URL}/contacts`);
        setMessage(response.data.reverse());
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
    console.log(message);
    console.log(enquiries);
  }, []);

  return (
    <div className="admin">
      <h1 className="admin__heading">Admin Panel</h1>
      <div className="admin__links">
        <Link className="admin__link" to="/enquiries">
          Enquiries
        </Link>
        <Link className="admin__link" to="/messages">
          Contact Messages
        </Link>
        <Link className="admin__link" to="/add">
          Add Establishment
        </Link>
      </div>
      <div className="enquiry">
        <fieldset className="enquiry__field">
          <legend className="enquiry__heading">Last Enquiry</legend>
          {enquiries.slice(0, 1).map((enquiry) => {
            console.log(enquiry);
            const priceTotal = enquiry.price * enquiry.nights;
            return (
              <div className="enquiry__content" key={enquiry.id}>
                <p className="enquiry__output">
                  Created at:{" "}
                  {new Date(enquiry.created_at).toString().substring(0, 21)}
                </p>
                <p className="enquiry__output">Hotel: {enquiry.hotel_name}</p>
                <p className="enquiry__output">Name: {enquiry.name}</p>
                <p className="enquiry__output">Check-in date: {enquiry.date}</p>
                <p className="enquiry__output">nights: {enquiry.nights}</p>
                <p className="enquiry__output">Adults: {enquiry.adults}</p>
                <p className="enquiry__output">Children: {enquiry.children}</p>
                <p className="enquiry__output">Price: {enquiry.price}kr</p>
                <p className="enquiry__total">SubTotal: {priceTotal}kr</p>
              </div>
            );
          })}
        </fieldset>
      </div>
      <div className="message">
        <fieldset className="message__field">
          <legend className="message__heading">Last Contact Message</legend>
          {message.slice(0, 1).map((msg) => {
            return (
              <div key={msg.id}>
                <p className="message__output">
                  Created at:{" "}
                  {new Date(msg.created_at).toString().substring(0, 24)}
                </p>
                <p className="message__output">Name: {msg.name}</p>
                <p className="message__output">Email: {msg.email}</p>
                <p className="message__output">Subject: {msg.subject}</p>
                <p className="message__output">Message: {msg.message}</p>
              </div>
            );
          })}
        </fieldset>
      </div>
    </div>
  );
};

export default Admin;
