import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../utils/constants";
import useAxios from "../utils/useAxios";
import DeleteButton from "../components/DeleteButton";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState(null);
  const http = useAxios();
  const history = useHistory();
  const [auth] = useContext(AuthContext);

  const param = "contacts";

  if (!auth) {
    history.push("/login");
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await http.get(`${BASE_URL}/${param}`);
        setMessages(response.data.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, []);
  return (
    <div>
      <Link to="/admin">Back</Link>
      {messages?.map((message) => {
        return (
          <div key={message.id}>
            <p>Name: {message.name}</p>
            <p>Email: {message.email}</p>
            <p>Subject: {message.subject}</p>
            <p>Message: {message.message}</p>
            <DeleteButton param={param} id={message.id} />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
