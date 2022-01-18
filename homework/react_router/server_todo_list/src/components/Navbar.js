import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/todo_create'>TodoCreate</Link>
      </li>
      <li>
        <Link to='/todo_lists'>TodoLists</Link>
      </li>
    </ul>
  );
};
