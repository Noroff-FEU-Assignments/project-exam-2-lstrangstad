import { Link } from "react-router-dom";

const Nav = () => {
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
      <div>
        <li>
          <Link to="/login">Admin login</Link>
        </li>
      </div>
    </nav>
  );
};

export default Nav;
