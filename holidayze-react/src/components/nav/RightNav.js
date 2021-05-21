import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 20px;
  }

  .link {
    text-decoration: none;
    color: #fff;
  }

  .link:hover {
    border-bottom: 2px solid #d54808;
  }

  button {
    border: none;
    background: transparent;
    color: red;
    font-size: 16px;
    cursor: pointer;
  }

  .active {
    border-bottom: 2px solid #d54808;
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

const RightNav = ({ open, setOpen }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();

  const logout = () => {
    setAuth(null);
    history.push("/");
  };
  return (
    <Ul open={open}>
      <li onClick={() => setOpen(!open)}>
        <NavLink exact activeClassName="active" className="link" to="/">
          Home
        </NavLink>
      </li>
      <li onClick={() => setOpen(!open)}>
        <NavLink activeClassName="active" className="link" to="/stays">
          Stays
        </NavLink>
      </li>
      <li onClick={() => setOpen(!open)}>
        <NavLink activeClassName="active" className="link" to="/contact">
          Contact Us
        </NavLink>
      </li>
      {auth ? (
        <>
          <li onClick={() => setOpen(!open)}>
            <NavLink activeClassName="active" className="link" to="/admin">
              Admin
            </NavLink>
          </li>
          <li onClick={() => setOpen(!open)}>
            <button onClick={logout}>Log out</button>
          </li>
        </>
      ) : (
        <li className="login" onClick={() => setOpen(!open)}>
          <NavLink className="link" to="/login">
            Login
          </NavLink>
        </li>
      )}
    </Ul>
  );
};

export default RightNav;
