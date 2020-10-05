import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
background-color: #D0D0D0;
`;

export const Content = styled.div`
margin: 30px auto;
width: 1300px;
flex: 1;
display: flex;
flex-direction: column;
`;

export const CategoryBox = styled.div`
  display: inline-block;
  align-items: center;
  text-align: center;

  div.category {
    background: #fff;
    display: inline-block;
    margin: 30px 60px;
    max-width: 300px;
    width: 280px;
    border-radius: 4px;
    text-align: center;

    a {
      font-size: 20px;
      color: #777;
      font-weight: bold;

      text-transform: uppercase;

      div.category-image {
      width: 100%;
      height: 180px;
      background-color: #DF2222;
      border-radius: 4px 4px 0px 0px;
    }

    span {
      padding: 14px 0;
      display: block;
    }
    }
  }
`;

export const BottomBox = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex: 1;

div.search {
  background: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  svg {
    background-color: #DF2222;
    padding: 8px 15px;
    box-sizing: content-box;
    border-radius: 4px 0px 0px 4px;
  }

  input {
    border: 0px;
    padding: 0 20px;
    color: #333;
    font-size: 20px;
  }
}

button {
  background-color: #DF2222;
  border: 0;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 35px;
  border-radius: 4px;

  &:hover {
    background-color: ${darken(0.06, '#df2222')};
  }

  span {
    font-size: 30px;
    padding: 0px 10px 0px 0px;
  }
}
`;
