import React, { useState, useEffect } from "react";
import axios from "axios";
import ThoughtItem from "./ThoughtItem";
import { useLoaderData } from "react-router-dom";

interface Thought {
  id: string;
  text: string;
  author: string;
  date: string;
  likes: number;
  dislikes: number;
}

const ThoughtList: React.FC = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/events")
  //     .then((response) => setThoughts(response.data.events))
  //     .catch((error) => console.error("Error fetching thoughts:", error));
  // }, []);

  // console.log(thoughts);

  const events = useLoaderData();
  useEffect(() => {
    // console.log(events);
    setThoughts(events);
  }, []);

  return (
    <div>
      {thoughts.map((thought) => (
        <ThoughtItem key={thought.id} thought={thought} isAuthor={null} />
      ))}
    </div>
  );
};

export default ThoughtList;
