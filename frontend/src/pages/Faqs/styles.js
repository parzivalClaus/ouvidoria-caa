import styled from 'styled-components';

import { darken } from 'polished';

import AsyncSelect from 'react-select/async';

export const Container = styled.div`
display: flex;
flex-direction: column;
background: #d0d0d0;
width: 100%;
height: auto;
min-height: 100%;
`;

export const Content = styled.div`
flex: 1;
width: 1300px;
margin: 30px auto;

.top-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}

span.back-button {
  display: block;

  a {
    font-size: 17px;
    color: #333;
    font-weight: bold;
    display: flex;
  align-items: center;
  padding: 0px 0px;

  svg {
    margin-right: 5px;
  }
  }
}

button {
  background: #EF1414;
  padding: 10px 15px;
  border: 0;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
  border-radius: 4px;

  &:hover {
    background: ${darken(0.07, '#EF1414')};
  }
}

p.noContent {
  font-size: 20px;
  margin-top: 45px;
  font-weight: bold;
}
`;

export const Filters = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;


export const FiltersBox = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
flex: auto;
margin-right: 25px;
`;

export const SearchBox = styled.div`
input {
  border-radius: 4px;
  padding: 10px 15px;
  border: 0px;
  font-size: 17px;
}
`;

export const CustomAsyncSelect = styled(AsyncSelect)`
width: 350px  ;
  font-size: 16px;
  color: #333;
  background-color: #f5f5f5;
  div {
    background-color: #f5f5f5;
    color: #333;
    border-radius: 4px;
  }
  .css-g1d714-ValueContainer {
    border: 0;

  }
  .css-yk16xz-control {
    background-color: #f5f5f5;
    border: 0;
    border-radius: 4px;
  }
  .css-1hwfws3 {
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
  .css-1uccc91-singleValue {
    padding: 10px 0px;
    border-radius: 4px;
    background-color: #f5f5f5;
  }
`;

export const FaqBox = styled.div`
background: #fff;
padding: 25px;
border-radius: 4px;
margin-top: 25px;
background: ${props => props.isAutor ? '#8F8B8B' : '#fff'}
`;

export const FaqHeader = styled.div`
background: #F0F0F0;
padding: 15px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
font-size: 16px;
font-weight: bold;

.date {
  color: #959191;
}
`;

export const FaqMessage = styled.div`
font-size: 16px;
margin-top: 15px;
color: ${props => props.isAutor ? '#FFF' : '#959191'}
`;
