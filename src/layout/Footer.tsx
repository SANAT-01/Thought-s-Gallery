import "../assets/css/FooterStyle.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <NavLink to="/"> Home </NavLink>
      <NavLink to="about"> About </NavLink>
      <a href="https://github.com/Sanat-01"> GitHub </a>
    </>
  );
};

export default Footer;
