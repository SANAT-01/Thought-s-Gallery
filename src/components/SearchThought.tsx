import React, { useState, useEffect } from "react";
import "../assets/css/SearchThought.css";
import Select from "react-select";
import axios from "axios"; // if needed
import { useLoaderData } from "react-router-dom";
import ThoughtItem from "./ThoughtItem";

interface Users {
  id: string;
  text: string;
  author: string;
  date: string;
  likes: number;
  dislikes: number;
}

const SearchThought: React.FC = () => {
  const [User, setUser] = useState<Users[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState<string | null>(null);
  const events = useLoaderData() as Users[];

  useEffect(() => {
    // Set the initial data from loader
    setUser(events);
  }, [events]);

  useEffect(() => {
    // Filter based on the input text and selected author
    const filtered = User.filter((user) => {
      const matchesDesc = user.text.toLowerCase().includes(desc.toLowerCase());
      const matchesAuthor = author ? user.author === author : true;
      return matchesDesc && matchesAuthor;
    });
    setFilteredUsers(filtered);
  }, [desc, author, User]);

  // Extract unique authors
  const uniqueAuthors = Array.from(new Set(User.map((quote) => quote.author)));

  // Create options array for the select component
  const options = uniqueAuthors.map((author) => ({
    value: author,
    label: author,
  }));

  const handleSelectChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setAuthor(selectedOption ? selectedOption.value : null);
  };

  return (
    <>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search any thought"
          className="searchBox"
          onChange={(x) => setDesc(x.target.value)}
        />
        <Select
          className="react-select__control"
          options={options}
          onChange={handleSelectChange}
          isClearable
          placeholder="Select any Author"
        />
      </div>
      {/* Render filtered results */}
      <div>
        {filteredUsers.map((user) => (
          <ThoughtItem key={user.id} thought={user} isAuthor={null} />
        ))}
      </div>
    </>
  );
};

export default SearchThought;
