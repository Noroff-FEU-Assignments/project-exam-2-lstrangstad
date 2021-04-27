import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

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
          <FacebookIcon />
        </a>
        <a href="www.twitter.com">
          <TwitterIcon />
        </a>
        <a href="www.instagram.com">
          <InstagramIcon />
        </a>
      </div>
      <div>
        <p>Copyright Linus Strangstad</p>
      </div>
    </div>
  );
};

export default Footer;
