import { createRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { TodoCreate } from './pages/TodoCreate';
import { TodoLists } from './pages/TodoLists';

const App = () => {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/todo_create' element={<TodoCreate addTodo={addTodo} />} />
        <Route path='/todo_lists' element={<TodoLists todos={todos} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
