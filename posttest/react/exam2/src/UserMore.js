import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
export const UserMore = () => {
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setData(response.data);
      });
  }, [id]);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          margin: '10px',
          padding: '10px',
        }}
      >
        <h1>UserMore {id}</h1>
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
          <p>Phone: {data.phone}</p>
          <p>Website: {data.website}</p>
          <p>
            {data.company && data.company.name}
            {data.company && data.company.catchPhrase}
            {data.company && data.company.bs}
          </p>
          <div style={{ textAlign: 'right' }}>
            <button
              style={{
                color: 'white',
                width: '100px',
                backgroundColor: '#6b77e1',
              }}
              onClick={() => navigate(`/user/${id}`)}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMore;
