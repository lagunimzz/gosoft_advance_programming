import React from 'react';

export const PictureCard = ({ picture }) => {
  return (
    <div>
      <p>ID : {picture.id}</p>
      <img src={picture.imgSrc} alt={picture.id} />
      <p>Create By : {picture.createBy}</p>
      <p>Date : {picture.date}</p>
      <p>Like Count : {picture.likeCount}</p>
      <p>Comment Count : {picture.commentCount}</p>
    </div>
  );
};
