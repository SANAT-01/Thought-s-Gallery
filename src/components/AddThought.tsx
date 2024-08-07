import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useLoaderData } from "react-router-dom";
import ThoughtItem from "./ThoughtItem";

interface Thought {
  id: string;
  text: string;
  author: string;
  date: string;
  likes: number;
  dislikes: number;
}

const AddThought: React.FC = () => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("Mr. ABC");
  const navigate = useNavigate();
  const isAuth = useSelector((state: any) => state.auth.isAuthenticated);
  const [userThoughts, setUserThoughts] = useState<Thought[]>([]);

  const events = useLoaderData();
  useEffect(() => {
    console.log(events);
    const filteredThoughts = events.filter(
      (thought) => thought.author === author
    );
    setUserThoughts(filteredThoughts);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuth) {
      navigate("/login");
    } else {
      axios
        .post("http://localhost:8080/events/", {
          text,
          author,
          date: new Date(),
          likes: 0,
          dislikes: 0,
        })
        .then((response) => {
          setText("");
          setAuthor("");
        })
        .catch((error) => console.error("Error adding thought:", error));
    }
  };

  return (
    <div>
      {/* use action in the route instead */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter thought"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder={author}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        /> */}
        <button type="submit">Add Thought</button>
      </form>
      <div>
        {userThoughts.map((thought) => (
          <ThoughtItem key={thought.id} thought={thought} />
        ))}
      </div>
    </div>
  );
};

export default AddThought;
