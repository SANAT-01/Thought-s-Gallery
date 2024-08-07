import "../assets/css/HearderStyle.css";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useNavigate, NavLink } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const loginNav = () => {
    navigate("/login");
  };
  console.log(isAuth);

  return (
    <div className="header-container">
      <h2 className="">Thought's Gallery !!</h2>
      {!isAuth && (
        <div>
          <button onClick={loginNav}>Login</button>
        </div>
      )}
      {isAuth && (
        <div>
          <NavLink to="/profile"> Profile </NavLink>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Header;
