import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import useAxios from "../utils/useAxios";

const Admin = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [message, setMessage] = useState([]);
  const http = useAxios();

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await http.get(`${BASE_URL}/bookings`);
        setEnquiries(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEnquiries();
    console.log(enquiries);

    const fetchMessages = async () => {
      try {
        const response = await http.get(`${BASE_URL}/contacts`);
        setMessage(response.data);
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
    <>
      <h1>Admin Panel</h1>
      <Link to="/enquiries">Enquiries</Link>
      <Link to="/contact-msg">Contact Message</Link>
      <div>
        <h2>Last Enquiry:</h2>
        {enquiries.map((enquiry) => {
          return (
            <div key={enquiry.id}>
              <p>Created at: {new Date(enquiry.created_at).toString()}</p>
              <p>Name: {enquiry.name}</p>
              <p>Check-in date: {enquiry.date}</p>
              <p>nights: {enquiry.nights}</p>
              <p>Adults: {enquiry.adults}</p>
              <p>Children: {enquiry.children}</p>
            </div>
          );
        })}
      </div>
      <div>
        <h2>Last Contact message:</h2>
        {message.map((msg) => {
          return (
            <div key={msg.id}>
              <p>Created at: {new Date(msg.created_at).toString()}</p>
              <p>Name: {msg.name}</p>
              <p>Email: {msg.email}</p>
              <p>Subject: {msg.subject}</p>
              <p>Message: {msg.message}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Admin;
