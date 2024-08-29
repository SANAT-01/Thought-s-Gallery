import React, { useState } from "react";
import ThoughtList from "../components/ThoughtList";
import SearchThought from "../components/SearchThought";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import "../assets/css/Home.css";

const Home: React.FC = () => {
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();
  const handleAddThought = () => {
    if (!token) {
      navigate("/auth");
    } else {
      navigate("/add");
    }
  };
  // console.log(token);
  return (
    <>
      <div className="Main">
        <div className="Home">
          <p>Let your thought inspire the world !!</p>
          <button onClick={handleAddThought}>Add your Thought</button>
        </div>
        <SearchThought />
        {/* <ThoughtList /> */}
      </div>
    </>
  );
};

export default Home;
