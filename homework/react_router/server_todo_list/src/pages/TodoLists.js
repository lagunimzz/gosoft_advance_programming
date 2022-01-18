import React from 'react';

export const TodoLists = ({ todos }) => {
  return (
    <ul>
      {todos.length > 0 &&
        todos.map((todo) => (
          <li>
            {todo.todo} {todo.detail}
          </li>
        ))}
    </ul>
  );
};
