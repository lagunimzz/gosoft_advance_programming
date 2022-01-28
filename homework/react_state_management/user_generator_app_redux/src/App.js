import axios from 'axios';
import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './actions';
const genUser = async () => {
  const response = await axios.get(`https://randomuser.me/api/`);
  return response.data.results[0];
};

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    genUser().then((u) => dispatch(addUser(u)));
  }, []);

  return (
    <div>
      {user && (
        <div>
          {user.picture && (
            <img alt={user.picture.large} src={user.picture.large}></img>
          )}
          <p>email: {user.email}</p>
          <p>gender: {user.gender}</p>
          {user.name && (
            <p>
              {user.name.title} {user.name.first} {user.name.last}
            </p>
          )}
          <button
            onClick={async () => {
              const u = await genUser();
              dispatch(addUser(u));
            }}
          >
            Gen User
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
