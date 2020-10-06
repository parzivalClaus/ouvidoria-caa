import styled from 'styled-components';

export const Container = styled.div`
height: 100%;
width: 100%;
background-color: #d0d0d0;
`;

export const Content = styled.div`
flex: 1;
display: flex;
flex-direction: column;
width: 100%;
max-width: 1300px;
margin: 0 auto;
padding: 30px 0;

span.back-button {
  display: block;

  a {
    font-size: 17px;
    color: #333;
    font-weight: bold;
    display: flex;
  align-items: center;
  padding: 10px 0px;
  margin-bottom: 20px;

  svg {
    margin-right: 5px;
  }
  }
}
`;

export const Title = styled.div`
strong {
  color: #52A411;
}
`;

export const QuestionBox = styled.div`
background: #fff;
padding: 25px;
border-radius: 4px;
margin-top: 25px;
`;

export const QuestionHeader = styled.div`
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

export const QuestionMessage = styled.div`
font-size: 16px;
color: #959191;
margin-top: 15px;
`;


