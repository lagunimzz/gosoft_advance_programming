import { useEffect, useState } from 'react';
import { Card } from './Card';

function App() {
  const [cardList, setCardList] = useState([...Array(10).keys()]);
  const shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };

  useEffect(() => {
    newDeck();
  }, []);

  const newDeck = () => {
    setCardList(shuffle(cardList));
  };

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '10px',
        }}
      >
        {cardList.map((card) => (
          <Card key={card} id={card} />
        ))}
      </div>
      <br />
      <button onClick={newDeck}>New Deck</button>
    </div>
  );
}

export default App;
