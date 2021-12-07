import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
export const UserMore = () => {
  const { id } = useParams();

  useEffect(async () => {
    console.log(id);
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    setData(result.data);
  }, []);
  const [data, setData] = useState({});
  const navigate = useNavigate();
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
          <p>Phone: {data.phone}</p>
          <p>Website: {data.website}</p>
          <p>
            {data.company && data.company.name}
            {data.company && data.company.catchPhrase}
            {data.company && data.company.bs}
          </p>
          <button onClick={() => navigate(`/user/${id}`)}>Back</button>
        </div>
      )}
    </div>
  );
};
export default UserMore;
