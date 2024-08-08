import React, { useState } from "react";
import "../assets/css/Profile.css";

interface ProfileProps {
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
}

const Profile: React.FC<ProfileProps> = () => {
  const userProfile = {
    name: "Mr. ABC",
    email: "Mr.ABC@Winjit.com",
    bio: "Software Developer at Winjit pvt ltd.",
    profilePicture:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  };
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(userProfile.name);
  const [newEmail, setNewEmail] = useState(userProfile.email);
  const [newBio, setNewBio] = useState(userProfile.bio);

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <img
        src={userProfile.profilePicture}
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
          <h2>{userProfile.name}</h2>
          <p>{userProfile.email}</p>
          <p>{userProfile.bio}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
