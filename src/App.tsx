import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error";
import Layout from "./layout/Layout";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AddThought from "./components/AddThought";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout children={<></>} />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          const response = await fetch("http://localhost:8080/events");
          const user = await fetch("http://localhost:8080/events/users");
          const fav = await fetch("http://localhost:8080/fav");
          if (!response.ok) {
            // ...
          } else {
            const resData = await response.json();
            const resUsers = await user.json();
            const resFav = await fav.json();
            console.log(resFav);
            return {
              events: resData.events,
              users: resUsers.user,
              fabs: resFav,
            };
          }
        },
      },

      {
        path: "add",
        element: <AddThought />,
        loader: async () => {
          const user = await fetch("http://localhost:8080/events/users");
          console.log(user);
          if (!user.ok) {
            // ...
          } else {
            const resUsers = await user.json();
            // console.log(resData);
            return { users: resUsers.user };
          }
        },
      },
      { path: "about", element: <About /> },
      { path: "profile", element: <Profile /> },
      {
        // path: "events",
        // element: <EventsRootLayout />,
        // children: [
        //   {
        //     index: true,
        //     element: <EventsPage />,
        //     loader: eventsLoader,
        //   },
        //   {
        //     path: ":eventId",
        //     element: <EventDetailPage />,
        //     loader: eventDetailLoader,
        //   },
        //   { path: "new", element: <NewEventPage /> },
        //   { path: ":eventId/edit", element: <EditEventPage /> },
        // ],
      },
    ],
  },
  {
    path: "auth",
    element: <AuthenticationPage />,
    action: authAction,
  },
  // { path: "login", element: <Login /> },
  {
    path: "logout",
    action: logoutAction,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;

// put tailwindcss
// enable liking system
// editing name
