import styled from 'styled-components';
import { darken } from 'polished';

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
`;

export const Filters = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const List = styled.div`
margin: 20px 0;
`;

export const FiltersBox = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap: 20px;

button {
  border: 0;
  padding: 10px 20px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 4px;
  transition: 0.2s;
}

.btnOpen {
    background-color: #FFDF34;

    &:hover {
      background-color: ${darken(0.15, '#FFDF34')};
    }
  }

.btnDone {
  background-color: #5BC927;
  color: #fff;

  &:hover {
      background-color: ${darken(0.15, '#5BC927')};
    }
}

.btnAll {
  background-color: #555555;
  color: #fff;

  &:hover {
      background-color: ${darken(0.15, '#555555')};
    }
}

`;

export const SearchBox = styled.div`
input {
  border-radius: 4px;
  padding: 10px 15px;
  border: 0px;
  font-size: 17px;
}
`;

export const ManifestationBox = styled.div`
background: #fff;
border-radius: 4px;
padding: 25px;
margin-bottom: 30px;
`;

export const Title = styled.div`
display: grid;
grid-template-columns: 10% 40% 20% 15% 15%;
font-size: 16px;
padding: 0px 0 20px 0;
`;

export const ContentLine = styled.div`
display: grid;
grid-template-columns: 10% 40% 20% 15% 15%;
font-size: 16px;
color: #959191;
padding: 5px 0;
`;
