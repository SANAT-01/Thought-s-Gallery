import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useNavigate,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import ThoughtItem from "./ThoughtItem";
import "../assets/css/AddThought.css";

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
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const [userThoughts, setUserThoughts] = useState<Thought[]>([]);
  const token = useRouteLoaderData("root") as string;
  const events = useLoaderData() as Thought[];

  useEffect(() => {
    const filteredThoughts = events.filter(
      (thought) => thought.author === author
    );
    setUserThoughts(filteredThoughts);
  }, [events, author, refresh]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
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
          setRefresh((prev) => !prev); // Toggle the refresh state to trigger useEffect
        })
        .catch((error) => console.error("Error adding thought:", error));
    }
  };

  const handleDelete = (id: string) => {
    setUserThoughts((prevThoughts) =>
      prevThoughts.filter((thought) => thought.id !== id)
    );
    setRefresh((prev) => !prev); // Toggle the refresh state to trigger useEffect
  };

  return (
    <div className="add-thought">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter thought"
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add Thought</button>
      </form>
      <div className="my-thought">
        {userThoughts.map((thought) => (
          <ThoughtItem
            key={thought.id}
            thought={thought}
            onDelete={handleDelete}
            isAuthor={author}
          />
        ))}
      </div>
    </div>
  );
};

export default AddThought;
