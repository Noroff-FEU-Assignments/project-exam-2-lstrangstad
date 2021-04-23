import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const Nav = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();

  const logout = () => {
    setAuth(null);
    history.push("/");
  };

  return (
    <nav>
      <div>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/stays">Stays</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </div>
      {auth ? (
        <>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/add">Add establishment</Link>
          </li>
          <li>
            <button onClick={logout}>Log out</button>
          </li>
        </>
      ) : (
        <div>
          <li>
            <Link to="/login">Admin login</Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Nav;
