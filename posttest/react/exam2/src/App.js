import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      setData(response.data);
    });
  }, []);
  const [data, setData] = useState([]);

  return (
    <div>
      <div
        style={{
          margin: '10px',
          padding: '10px',
        }}
      >
        <h1>User Lists</h1>
      </div>
      {data.map((d) => (
        <div
          style={{
            justifyContent: 'flex-start',
            border: '1px solid',
            display: 'flex',
            flexDirection: 'column',
            width: '800px',
            margin: '10px',
            padding: '10px',
          }}
          key={d.id}
        >
          <p>ID: {d.id}</p>
          <p>Name: {d.name}</p>
          <p>Email: {d.email}</p>
          <p>
            Address: {d.address.street} {d.address.suite} {d.address.city}
          </p>
          <div style={{ textAlign: 'right' }}>
            <button
              style={{
                color: 'white',
                width: '100px',
                backgroundColor: '#6b77e1',
              }}
              onClick={() => navigate(`/user/${d.id}`)}
            >
              View More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
