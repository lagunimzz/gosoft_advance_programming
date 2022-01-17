import React from 'react';

export const Detail = ({ todo, detail, onClose }) => {
  return (
    <div
      style={{
        background: '#eee',
        zIndex: 999,
        width: '60%',
        margin: '0 auto',
        textAlign: 'left',
        height: 400,
        display: 'block',
        padding: 10,
        position: 'relative',
      }}
    >
      <button
        style={{
          position: 'absolute',
          top: 10,
          left: 'auto',
          right: 10,
        }}
        onClick={onClose}
      >
        x
      </button>
      <strong>Detail</strong>

      <p>Todo : {todo}</p>
      <p>Detail : {detail}</p>
    </div>
  );
};
