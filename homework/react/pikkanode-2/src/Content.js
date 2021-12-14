import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from './Card';
const Container = styled.div`
  padding: 50px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: space-between;
`;
export const Content = () => {
  const [data, setData] = useState([
    {
      id: 1,
      like: 200,
      comment: 530,
      date: '2021-11-05',
      img: 'https://picsum.photos/200',
    },
    {
      id: 2,
      like: 10,
      comment: 430,
      date: '2021-03-09',
      img: 'https://picsum.photos/200',
    },
    {
      id: 3,
      like: 30,
      comment: 330,
      date: '2019-04-22',
      img: 'https://picsum.photos/200',
    },
    {
      id: 4,
      like: 440,
      comment: 120,
      date: '2022-12-11',
      img: 'https://picsum.photos/200',
    },
    {
      id: 5,
      like: 50,
      comment: 130,
      date: '2021-02-28',
      img: 'https://picsum.photos/200',
    },
  ]);
  return (
    <Container>
      {data && data.map((item) => <Card key={item.id} data={item} />)}
    </Container>
  );
};
