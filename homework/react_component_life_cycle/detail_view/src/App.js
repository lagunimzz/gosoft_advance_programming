import { useEffect, useState } from 'react';
import axios from 'axios';
import { Detail } from './Detail';
function App() {
  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [detailData, setDetailData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get('https://todo.showkhun.co/lists');
      return data.data;
    };

    fetchData().then((res) => {
      setData(res);
    });
  }, []);
  const clickTodo = (e, d) => {
    setDetailData({
      ...d,
      onClose: () => {
        setIsShow(false);
        alert(d.todo);
      },
    });
    setIsShow(true);
    e.preventDefault();
  };
  return (
    <div>
      {data.length === 0 ? (
        'Loading...'
      ) : (
        <ul>
          {data.lists.map((d) => (
            <li key={d.id}>
              <a href='!#' onClick={(e) => clickTodo(e, d)}>
                {d.todo}
              </a>
            </li>
          ))}
        </ul>
      )}
      {isShow ? <Detail {...detailData} /> : false}
    </div>
  );
}

export default App;
