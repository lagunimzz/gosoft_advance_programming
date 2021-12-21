import logo from './logo.svg';
import './App.css';
import { PictureCard } from './PictureCard';
import { useState } from 'react';

function App() {
  const [pictureList, setPictureList] = useState([
    {
      id: 1,
      imgSrc: 'https://picsum.photos/200/300',
      createBy: 'A',
      date: '2021-10-01',
      likeCount: 20,
      commentCount: 50,
    },
    {
      id: 2,
      imgSrc: 'https://picsum.photos/200/300',
      createBy: 'B',
      date: '2021-01-02',
      likeCount: 202,
      commentCount: 550,
    },
    {
      id: 3,
      imgSrc: 'https://picsum.photos/200/300',
      createBy: 'C',
      date: '2021-01-01',
      likeCount: 20,
      commentCount: 50,
    },
    {
      id: 4,
      imgSrc: 'https://picsum.photos/200/300',
      createBy: 'D',
      date: '2021-01-03',
      likeCount: 240,
      commentCount: 530,
    },
    {
      id: 5,
      imgSrc: 'https://picsum.photos/200/300',
      createBy: 'E',
      date: '2021-01-04',
      likeCount: 220,
      commentCount: 150,
    },
  ]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {pictureList.map((picture) => (
        <PictureCard key={picture.id} picture={picture} />
      ))}
    </div>
  );
}

export default App;
