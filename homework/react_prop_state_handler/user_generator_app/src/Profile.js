import React from 'react';

export const Profile = ({ picture, id, email, gender, name }) => {
  return (
    <div>
      <img src={picture} alt={id} />
      <p>{email}</p>
      <p>{gender}</p>
      <p>{name}</p>
    </div>
  );
};
