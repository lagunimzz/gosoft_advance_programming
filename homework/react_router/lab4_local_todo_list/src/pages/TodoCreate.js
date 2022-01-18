import React from 'react';
import { useNavigate } from 'react-router-dom';
export const TodoCreate = ({ addTodo }) => {
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        addTodo(e.target.todo.value);
        e.preventDefault();
        navigate('/todo_lists');
      }}
    >
      <input name='todo' type='text' />
      <button>Submit</button>
    </form>
  );
};
