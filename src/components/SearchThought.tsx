import React, { useState, useEffect } from "react";
import "../assets/css/SearchThought.css";
import Select from "react-select";
import axios from "axios"; // if needed
import { useLoaderData } from "react-router-dom";
import ThoughtItem from "./ThoughtItem";

interface events {
  id: string;
  text: string;
  author: string;
  date: string;
  likes: number;
  dislikes: number;
}

interface userx {
  email: string;
  password: string;
  img: string;
  name: string;
  bio: string;
  id: string;
}

interface favx {
  id: string;
  idThought: string;
  user: string[];
}

const SearchThought: React.FC = () => {
  const [UserThougth, setUserThougth] = useState<events[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<events[]>([]);
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState<string | null>(null);
  const data = useLoaderData() as {
    events: events[];
    users: userx[];
    fabs: favx;
  };
  const events = data.events as events[];
  const usx = data.users;
  const fabx = data.fabs;
  // console.log(fabx);
  useEffect(() => {
    // Set the initial data from loader
    setUserThougth(events);
  }, [events]);

  useEffect(() => {
    // Filter based on the input text and selected author
    const filtered = UserThougth.filter((user) => {
      const matchesDesc = user.text.toLowerCase().includes(desc.toLowerCase());
      const matchesAuthor = author ? user.author === author : true;
      return matchesDesc && matchesAuthor;
    });
    setFilteredUsers(filtered);
  }, [desc, author, UserThougth]);

  const userPictureMap = usx.reduce((acc, user) => {
    acc[user.name] = user.img;
    return acc;
  }, {} as { [key: string]: string });

  // console.log(userPictureMap);

  // Extract unique authors
  const uniqueAuthors = Array.from(
    new Set(UserThougth.map((quote) => quote.author))
  );

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
          <ThoughtItem
            key={user.id}
            thought={user}
            isAuthor={null}
            userList={userPictureMap}
            fabs={fabx}
          />
        ))}
      </div>
    </>
  );
};

export default SearchThought;
