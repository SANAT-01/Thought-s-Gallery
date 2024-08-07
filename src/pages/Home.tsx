import React from "react";
import ThoughtList from "../components/ThoughtList";
import AddThought from "../components/AddThought";
import SearchThought from "../components/SearchThought";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
  //   useEffect(()=>{
  // fetch('/api').then((res)=>{
  //   return res.json()
  // }).then((data)=>{
  //   setUser({name:data.name,rollno:data.rollno})
  // })
  //   },[])

  const isAuth = useSelector((state: any) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const handleAddThought = () => {
    if (!isAuth) {
      navigate("/login");
    } else {
      navigate("/add");
    }
  };

  return (
    <>
      <div className="Home">
        <p>Let your thought inspire the world !!</p>
        <button onClick={handleAddThought}>Add your Thought</button>
        <SearchThought />
        <ThoughtList />
      </div>
    </>
  );
};

export default Home;
