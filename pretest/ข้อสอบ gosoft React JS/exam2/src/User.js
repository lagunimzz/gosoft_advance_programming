import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
export const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(async () => {
    console.log(id);
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    setData(result.data);
  }, []);
  const [data, setData] = useState({});

  return (
    <div>
      <h1>User Lists</h1>
      {data && (
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
          key={data.id}
        >
          <p>ID: {data.id}</p>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>
            {data.address && data.address.street}
            {data.address && data.address.suite}
            {data.address && data.address.city}
          </p>
          <button onClick={() => navigate(`/user-more/${id}`)}>
            View More
          </button>
        </div>
      )}
    </div>
  );
};
export default User;
