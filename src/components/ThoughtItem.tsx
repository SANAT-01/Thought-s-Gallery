import React, { useState } from "react";
import "../assets/css/ThoughtItems.css";
import { useRouteLoaderData } from "react-router-dom";
import axios from "axios";

interface ThoughtProps {
  thought: {
    id: string;
    text: string;
    author: string;
    date: string;
    likes: number;
    dislikes: number;
  };
  onDelete: (id: string) => void;
  isAuthor: string;
}

const ThoughtItem: React.FC<ThoughtProps> = ({
  thought,
  onDelete,
  isAuthor,
}) => {
  const token = useRouteLoaderData("root") as string;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(thought.text);

  const handleDeleteThoughts = async () => {
    try {
      await axios.delete(`http://localhost:8080/events/${thought.id}`);
      onDelete(thought.id);
    } catch (error) {
      console.error("Error deleting thought:", error);
    }
  };

  const handleEditThoughts = async () => {
    if (isEditing) {
      try {
        await axios.patch(`http://localhost:8080/events/${thought.id}`, {
          text: editText,
          author: thought.author,
          date: thought.date,
          likes: thought.likes,
          dislikes: thought.dislikes,
        });
        thought.text = editText; // Update the thought text locally
      } catch (error) {
        console.error("Error updating thought:", error);
      }
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="thoughtItem">
      {!isEditing && <p className="thoughtText">{thought.text}</p>}
      {isEditing && (
        <input
          type="text"
          placeholder="Enter thought"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      )}
      <p className="thoughtAuthor">{thought.author}</p>
      <p className="thoughtDate">{thought.date}</p>
      <div className="thoughtActions">
        <span>{thought.likes}</span>
        <button>👍</button>
        <span>{thought.dislikes}</span>
        <button>👎</button>
        {token && thought.author === isAuthor && (
          <div>
            <button onClick={handleDeleteThoughts}>🗑️Delete</button>
            <button onClick={handleEditThoughts}>
              {!isEditing ? "Edit" : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThoughtItem;
