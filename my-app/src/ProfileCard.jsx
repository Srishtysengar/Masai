import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({
  name = "Anonymous User",
  age,
  bio = "No bio available."
}) => {
  const truncatedBio =
    bio.length > 100 ? bio.slice(0, 100) + "… Read More" : bio;

  return (
    <div className="profile-card">
      <h2>{name}</h2>
      {age !== undefined && <p><strong>Age:</strong> {age}</p>}
      <p className="bio">{truncatedBio}</p>
    </div>
  );
};

export default ProfileCard;
