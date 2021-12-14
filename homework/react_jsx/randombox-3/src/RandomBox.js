import React from 'react';
import styled from 'styled-components';
const color = ['red', 'blue', 'green', 'purple', 'pink'];
const Text = styled.div`
  font-size: ${Math.random() * 20 + 20}px;
  color: white;
`;
const Box = styled.div`
  background-color: ${color[Math.floor(Math.random() * 5)]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 300px;
  height: 100px;
`;
export const RandomBox = () => {
  return (
    <div>
      <Box>
        <Text>RandomBox</Text>
      </Box>
    </div>
  );
};
