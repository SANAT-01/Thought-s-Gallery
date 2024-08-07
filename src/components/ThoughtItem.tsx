import React from "react";
import "../assets/css/ThoughtItems.css";

interface ThoughtProps {
  thought: {
    id: string;
    text: string;
    author: string;
    date: string;
    likes: number;
    dislikes: number;
  };
}

const ThoughtItem: React.FC<ThoughtProps> = ({ thought }) => {
  return (
    <div className="thoughtItem">
      <p className="thoughtText">{thought.text}</p>
      <p className="thoughtAuthor">{thought.author}</p>
      <p className="thoughtDate">{thought.date}</p>
      <div className="thoughtActions">
        <span>{thought.likes}</span>
        <button>👍</button>
        <span>{thought.dislikes}</span>
        <button>👎</button>
      </div>
    </div>
  );
};

export default ThoughtItem;
