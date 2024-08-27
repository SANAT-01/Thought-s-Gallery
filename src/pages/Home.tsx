import React, { useState } from "react";
import ThoughtList from "../components/ThoughtList";
// import AddThought from "../components/AddThought";
import SearchThought from "../components/SearchThought";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
// import { useSelector } from "react-redux";
import "../assets/css/Home.css";

const Home: React.FC = () => {
  //   useEffect(()=>{
  // fetch('/api').then((res)=>{
  //   return res.json()
  // }).then((data)=>{
  //   setUser({name:data.name,rollno:data.rollno})
  // })
  //   },[])
  const token = useRouteLoaderData("root");
  // const isAuth = useSelector((state: any) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const handleAddThought = () => {
    if (!token) {
      navigate("/auth");
    } else {
      navigate("/add");
    }
  };
  console.log(token);
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
