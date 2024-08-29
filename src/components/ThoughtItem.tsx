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
  userList: { [key: string]: string }; // Assuming userList maps author to profile picture URL
  fabs: object;
}

const ThoughtItem: React.FC<ThoughtProps> = ({
  thought,
  onDelete,
  isAuthor,
  userList,
  fabs,
}) => {
  const token = useRouteLoaderData("root") as string;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(thought.text);
  const [likes, setLikes] = useState(thought.likes);
  const [dislikes, setDislikes] = useState(thought.dislikes);
  const loggedUser = localStorage.getItem("email");
  // console.log(fabs);
  const handleDeleteThoughts = async () => {
    try {
      await axios.delete(`http://localhost:8080/events/${thought.id}`);
      onDelete(thought.id);
    } catch (error) {
      console.error("Error deleting thought:", error);
    }
  };

  const handleEditThoughts = async ({ flag = false } = {}) => {
    if (isEditing) {
      console.log("inside handleEditThoughts");
      try {
        await axios.patch(`http://localhost:8080/events/${thought.id}`, {
          text: editText,
          author: thought.author,
          date: thought.date,
          likes,
          dislikes,
        });
        thought.text = editText; // Update the thought text locally
      } catch (error) {
        console.error("Error updating thought:", error);
      }
    }

    if (flag) {
      setIsEditing((prev) => !prev);
    }
  };

  const handleLike = () => {
    if (loggedUser) {
      console.log(thought.id);
      setLikes(likes + 1);
      console.log(likes);
      handleEditThoughts(); // Trigger update after local state is set
    }
  };

  const handleDislike = () => {
    if (loggedUser) {
      setDislikes(dislikes + 1);
      handleEditThoughts(); // Trigger update after local state is set
    }
  };

  return (
    <div className="thoughtItem">
      <div className="thoughtHeader">
        <img
          src={
            userList[thought.author] ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt={`${thought.author}'s profile`}
          className="profilePicture"
        />
        <div className="thoughtMeta">
          <p className="thoughtAuthor">{thought.author}</p>
          <p className="thoughtDate">{thought.date}</p>
        </div>
      </div>
      {!isEditing && <p className="thoughtText">{thought.text}</p>}
      {isEditing && (
        <input
          type="text"
          placeholder="Enter thought"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      )}
      <div className="thoughtActions">
        <span>{likes}</span>
        <button onClick={handleLike}>👍</button>
        <span>{dislikes}</span>
        <button onClick={handleDislike}>👎</button>
        {token && thought.author === isAuthor && (
          <div>
            <button onClick={handleDeleteThoughts}>🗑️ Delete</button>
            <button onClick={() => handleEditThoughts({ flag: true })}>
              {!isEditing ? "Edit" : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThoughtItem;
