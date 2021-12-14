import React from 'react';
import styled from 'styled-components';

const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ccc;
`;
const Link = styled.a``;
const Img = styled.img`
  max-height: 50px;
`;
export const Header = () => {
  return (
    <NavBar>
      <Img
        src='https://github.com/panotza/pikkanode/blob/master/pikkanode.png?raw=true'
        alt='pikkanode logo'
      />
      <Link href='#'>CratePikka</Link>
      <Link href='#'>Signup</Link>
      <Link href='#'>Signin</Link>
      <Link href='#'>Signout</Link>
    </NavBar>
  );
};
