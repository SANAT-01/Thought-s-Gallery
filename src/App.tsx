import React from "react";
import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error";
import Layout from "./layout/Layout";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AddThought from "./components/AddThought";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout children={<></>} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          const response = await fetch("http://localhost:8080/events");

          if (!response.ok) {
            // ...
          } else {
            const resData = await response.json();
            // console.log(resData);
            return resData.events;
          }
        },
      },

      {
        path: "add",
        element: <AddThought />,
        loader: async () => {
          const response = await fetch("http://localhost:8080/events");

          if (!response.ok) {
            // ...
          } else {
            const resData = await response.json();
            // console.log(resData);
            return resData.events;
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
  { path: "login", element: <Login /> },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
