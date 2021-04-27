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
    <nav className="nav">
      <div className="nav__logo">
        <strong className="nav__logo-txt">
          Holi<span className="nav__logo-contrast">daze</span>
        </strong>
      </div>
      <div className="nav__navigation">
        <li className="nav__list">
          <Link to="/">Home</Link>
        </li>
        <li className="nav__list">
          <Link to="/stays">Stays</Link>
        </li>
        <li className="nav__list">
          <Link to="/contact">Contact</Link>
        </li>
      </div>
      {auth ? (
        <div className="nav__auth">
          <li className="nav__list">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="nav__list">
            <Link to="/add">Add establishment</Link>
          </li>
          <li className="nav__list">
            <button onClick={logout}>Log out</button>
          </li>
        </div>
      ) : (
        <div className="nav__auth">
          <li className="nav__list">
            <Link to="/login">Admin login</Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Nav;
