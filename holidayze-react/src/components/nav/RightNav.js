import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }

  .link {
    text-decoration: none;
    color: #fff;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #13225d;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
    }
  }
`;

const RightNav = ({ open }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();

  const logout = () => {
    setAuth(null);
    history.push("/");
  };
  return (
    <Ul open={open}>
      <li>
        <Link className="link" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="link" to="/stays">
          Stays
        </Link>
      </li>
      <li>
        <Link className="link" to="/contact">
          Contact Us
        </Link>
      </li>
      {auth ? (
        <>
          <li>
            <Link className="link" to="/admin">
              Admin
            </Link>
          </li>
          <li>
            <Link className="link" to="/add">
              Add establishment
            </Link>
          </li>
          <li>
            <button onClick={logout}>Log out</button>
          </li>
        </>
      ) : (
        <li>
          <Link className="link" to="/login">
            Login
          </Link>
        </li>
      )}
    </Ul>
  );
};

export default RightNav;
