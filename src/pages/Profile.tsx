import React, { useState, useEffect } from "react";
import "../assets/css/Profile.css";
import axios from "axios";
// import Password from "antd/es/input/Password";

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
  const [newImage, setNewImage] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBio, setNewBio] = useState("");
  const [userId, setUserId] = useState(null);
  const [xyz, setXYZ] = useState("");
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
          setUserId(user.id);
          setNewBio(user.bio);
          setNewImage(user.img);
          setXYZ(user.password);
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [loggedEmail]);

  const handleEditUser = async () => {
    try {
      await axios.patch(`http://localhost:8080/events/user/${userId}`, {
        email: newEmail,
        password: xyz,
        img: newImage,
        name: newName,
        bio: newBio,
        id: "10b916c5-aec1-4211-aec3-62068f2a8e7f",
      });
      // thought.text = "editText;" // Update the thought text locally
    } catch (error) {
      console.error("Error updating thought:", error);
    }

    // setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    // Handle save logic here, e.g., sending data to the backend.
    setIsEditing(false);
  };

  if (!personalData) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  return (
    <div className="profile-container">
      <img src={newImage} alt="Profile" className="profile-picture" />
      {isEditing ? (
        <div className="profile-details">
          <input
            type="text"
            value={newName}
            disabled
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            value={newImage}
            // disabled
            onChange={(e) => setNewImage(e.target.value)}
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
          <button onClick={handleEditUser}> Submit Details</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
