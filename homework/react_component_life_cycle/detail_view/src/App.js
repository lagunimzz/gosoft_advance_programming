import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get('https://todo.showkhun.co/lists');
      return data.data;
    };

    fetchData().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div>
      {data.length === 0
        ? 'Loading...'
        : data.lists.map((d) => (
            <p>
              {d.id} {d.detail} {d.todo} {d.status}
            </p>
          ))}
    </div>
  );
}

export default App;
