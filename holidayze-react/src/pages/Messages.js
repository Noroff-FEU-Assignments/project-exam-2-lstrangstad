import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../utils/constants";
import useAxios from "../utils/useAxios";
import DeleteButton from "../components/DeleteButton";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const Messages = () => {
  const [messages, setMessages] = useState(null);
  const [loader, setLoader] = useState(true);
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
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, []);
  return (
    <div className="messages">
      <Link className="messages__link" to="/admin">
        Back
      </Link>
      <div className="messages__container">
        {loader ? (
          <div className="loader">
            <CircularProgress style={{ placeItems: "center" }} />
          </div>
        ) : (
          <>
            {messages?.map((message) => {
              return (
                <div className="messages__content" key={message.id}>
                  <div className="messages__box">
                    <label className="messages__label">Sent:</label>
                    <p className="messages__output">
                      {message.created_at.toString().substring(0, 10)}
                    </p>
                  </div>
                  <div className="messages__box">
                    <label className="messages__label">Name:</label>
                    <p className="messages__output">{message.name}</p>
                  </div>
                  <div className="messages__box">
                    <label className="messages__label">Email:</label>
                    <p className="messages__output">{message.email}</p>
                  </div>
                  <div className="messages__box">
                    <label className="messages__label">Subject:</label>
                    <p className="messages__output">{message.subject}</p>
                  </div>
                  <div className="messages__box">
                    <label className="messages__label">Message:</label>
                    <p className="messages__output messages__msg">
                      {message.message}
                    </p>
                  </div>
                  <div>
                    <DeleteButton
                      className="messages__btn"
                      param={param}
                      id={message.id}
                    />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
