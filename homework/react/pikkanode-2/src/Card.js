import React from 'react';
import styled from 'styled-components';
const Div = styled.div`
  width: 200px;
  border: 1px solid #ccc;
`;
const CardContent = styled.div`
  padding: 20px;
`;
export const Card = ({ data }) => {
  return (
    <Div>
      <img alt={data.id} src={data.img} />
      <CardContent>
        <p>วันที่: {data.date}</p>
        <p>จำนวน {data.like}</p>
        <p>จำนวน Comment: {data.comment} </p>
      </CardContent>
    </Div>
  );
};
