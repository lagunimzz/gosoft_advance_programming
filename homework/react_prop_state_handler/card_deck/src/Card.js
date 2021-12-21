import React from 'react';

export const Card = ({ id }) => {
  const colorList = ['red', 'blue', 'green', 'purple', 'pink'];
  return (
    <div
      style={{
        height: '100px',
        width: '100px',
        backgroundColor: colorList[id % 5],
      }}
    ></div>
  );
};
