import { useEffect, useState } from 'react';
import axios from 'axios';

export const App = () => {
  useEffect(async () => {
    const result = await axios.get(
      'https://jsonplaceholder.typicode.com/users '
    );
    setData(result.data);
  }, []);
  const [data, setData] = useState([]);

  return (
    <div>
      <h1>User Lists</h1>
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
          <button onClick={() => alert(JSON.stringify(d))}>View More</button>
        </div>
      ))}
    </div>
  );
};

export default App;
