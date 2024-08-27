import React, { useState, useEffect } from "react";
import "../assets/css/Profile.css";
import axios from "axios";

interface ProfileProps {
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
}

const Profile: React.FC = () => {
  const [personalData, setPersonalData] = useState<ProfileProps | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBio, setNewBio] = useState("My Bio");

  const loggedEmail = localStorage.getItem("email");

  useEffect(() => {
    axios
      .get("http://localhost:8080/events/users")
      .then((response) => {
        const user = response.data.user.find(
          (user) => user.email === loggedEmail
        );
        if (user) {
          setPersonalData(user);
          setNewName(user.name);
          setNewEmail(user.email);
          // setNewBio();
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [loggedEmail]);

  const handleSave = () => {
    // Handle save logic here, e.g., sending data to the backend.
    setIsEditing(false);
  };

  if (!personalData) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  return (
    <div className="profile-container">
      <img
        src={personalData.profilePicture}
        alt="Profile"
        className="profile-picture"
      />
      {isEditing ? (
        <div className="profile-details">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <textarea
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="profile-details">
          <h2>{newName}</h2>
          <p>{newEmail}</p>
          <p>{newBio}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
