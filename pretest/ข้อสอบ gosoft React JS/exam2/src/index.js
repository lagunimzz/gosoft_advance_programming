import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { User } from './User';
import { UserMore } from './UserMore';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' caseSensitive={false} element={<App />} />
        <Route path='/user/:id' caseSensitive={false} element={<User />} />
        <Route
          path='/user-more/:id'
          caseSensitive={false}
          element={<UserMore />}
        />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
