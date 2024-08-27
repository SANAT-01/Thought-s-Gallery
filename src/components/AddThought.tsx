import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
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
  const [author, setAuthor] = useState("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const navigate = useNavigate();
  const [userThoughts, setUserThoughts] = useState<Thought[]>([]);
  const token = useRouteLoaderData("root") as string;
  // const events = useLoaderData() as Thought[];
  const loggedEmail = localStorage.getItem("email");

  useEffect(() => {
    axios
      .get("http://localhost:8080/events/users")
      .then((response) => {
        const user = response.data.user.find(
          (user) => user.email === loggedEmail
        );
        if (user) {
          setAuthor(user.name);
          // setNewBio();
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [loggedEmail]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/events")
      .then((response) => {
        const filteredThoughts = response.data.events.filter(
          (thought) => thought.author === author
        );
        console.log(filteredThoughts);
        setUserThoughts(filteredThoughts);
      })
      .catch((error) => console.error("Error fetching thoughts:", error));

    console.log("Calling use effect");
  }, [author, refresh]);

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

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/events/${id}`);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error deleting thought:", error);
    }
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
