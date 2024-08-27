import { json, redirect } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { authActions } from "../store/auth";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  // const dispatch = useDispatch();
  // const isAuth = useSelector((state: any) => state.auth.isAuthenticated);

  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  console.log(searchParams.get("mode"));
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  let nameMatch = data.get("email").match(/^([^@]*)@/);
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
    img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    name: nameMatch ? nameMatch[1] : null,
    bio: "",
  };
  localStorage.setItem("email", data.get("email"));

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  const expiration = new Date();
  console.log(expiration);
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
