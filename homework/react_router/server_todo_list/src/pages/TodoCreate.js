import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const TodoCreate = ({ addTodo }) => {
  const navigate = useNavigate();
  return (
    <form
      onSubmit={async (e) => {
        const { todo, detail } = e.target;

        e.preventDefault();
        await axios.post('https://todo.showkhun.co/create', {
          todo: todo.value,
          detail: detail.value,
        });
        navigate('/todo_lists');
        addTodo({ todo: todo.value, detail: detail.value });
      }}
    >
      <div>
        Todo:
        <input name='todo' type='text' />
      </div>
      <div>
        Detai:
        <textarea name='detail' />
      </div>

      <button>Submit</button>
    </form>
  );
};
