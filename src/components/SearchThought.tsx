import React, { useState, useEffect } from "react";
import "../assets/css/SearchThought.css";
import Select from "react-select";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

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

  const events = useLoaderData();
  useEffect(() => {
    console.log(events);
    setUser(events);
  }, []);

  const [word, setWord] = useState<string | null>(null);
  // Extract unique authors
  const uniqueAuthors = Array.from(new Set(User.map((quote) => quote.author)));

  // Create options array
  const options = uniqueAuthors.map((author) => ({
    value: author,
    label: author,
  }));

  const handleSelectChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setWord(selectedOption ? selectedOption.value : "");
  };

  console.log(word);
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search any thought"
        className="searchBox"
      />
      <Select
        options={options}
        onChange={handleSelectChange}
        isClearable
        placeholder="Select any Author"
      />
    </div>
  );
};

export default SearchThought;
