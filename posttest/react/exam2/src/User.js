import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
export const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setData(response.data);
      });
  }, [id]);
  const [data, setData] = useState({});

  return (
    <div>
      <div
        style={{
          margin: '10px',
          padding: '10px',
        }}
      >
        <h1>User {id}</h1>
      </div>
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
          <div style={{ textAlign: 'right' }}>
            <button
              style={{
                color: 'white',
                width: '100px',
                backgroundColor: '#6b77e1',
              }}
              onClick={() => navigate(`/user-more/${id}`)}
            >
              View More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default User;
