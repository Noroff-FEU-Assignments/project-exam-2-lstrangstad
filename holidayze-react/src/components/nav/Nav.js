import { Link } from "react-router-dom";
import styled from "styled-components";
import Burger from "./Burger";

const Navbar = styled.nav`
  display: flex;
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  background-color: #13225d;
  .logo {
    padding: 15px 0;
    .logotxt {
      color: white;
      text-decoration: none;
      font-size: 20px;
    }
  }
`;

const Nav = () => {
  return (
    <Navbar>
      <div className="logo">
        <Link className="logotxt" to="/">
          Holi<span>daze</span>
        </Link>
      </div>
      <Burger />
    </Navbar>
  );
};

export default Nav;
