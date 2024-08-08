import "../assets/css/HearderStyle.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import {
  useNavigate,
  Form,
  useRouteLoaderData,
  NavLink,
} from "react-router-dom";
// import { checkAuthLoader } from "../util/auth";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isAuth = useSelector((state: any) => state.auth.isAuthenticated);
  const token = useRouteLoaderData("root") as string;

  // const logoutHandler = () => {
  //   dispatch(authActions.logout());
  //   navigate("/logout");
  // };
  console.log();
  const loginNav = () => {
    dispatch(authActions.login());
    navigate("/auth");
  };
  // const checking = checkAuthLoader();
  // console.log(checking);

  return (
    <div className="header-container">
      <h2 className="">Thought's Gallery !!</h2>
      {!token && (
        <div>
          <button onClick={loginNav}>Login</button>
        </div>
      )}
      {token && (
        <Form action="/logout" method="post">
          <NavLink to="/profile"> Profile </NavLink>
          <button>Logout</button>
        </Form>
      )}
    </div>
  );
};

export default Header;
