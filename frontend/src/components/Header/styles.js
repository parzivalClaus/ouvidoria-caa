import styled from 'styled-components';

export const Container = styled.div`
background-color: #555;
display: flex;
justify-content: center;
align-items: center;
`;
export const Wrapper = styled.div`
width: 1300px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;
export const Logo = styled.p`
font-weight: bold;
color: #fff;
font-size: 25px;
`;
export const User = styled.p`
font-weight: bold;
color: #fff;
font-size: 18px;
padding: 25px 0;

&:hover {
  cursor: pointer;
}

&:hover .user-submenu {
  display: flex;
  opacity: 1;
}

.user-submenu {
  display: none;
  opacity: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #555;
  padding: 20px;
  font-size: 16px;
  border-radius: 4px;
  font-weight: normal;
  transition: 0.2s;

  a {
    color: #fff;
    padding: 8px;

    &:hover {
      opacity: 0.6;
    }
  }

  button {
    color: #fff;
    background: none;
    border: 0;
    padding: 8px;
    text-align: left;
    font-size: 16px;
  }
}
`;


