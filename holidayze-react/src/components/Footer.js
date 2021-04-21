import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="">Stays</Link>
        </li>
        <li>
          <Link to="">Contact</Link>
        </li>
      </div>
      <div>
        <a href="www.facebook.com">
          <img src="#" alt="" />
        </a>
        <a href="www.twitter.com">
          <img src="#" alt="" />
        </a>
        <a href="www.instagram.com">
          <img src="#" alt="" />
        </a>
      </div>
      <div>
        <p>Copyright Linus Strangstad</p>
      </div>
    </div>
  );
};

export default Footer;
