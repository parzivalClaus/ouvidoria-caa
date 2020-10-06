import styled from 'styled-components';
import { darken } from 'polished';
import { Form } from '@rocketseat/unform';

export const Container = styled.div`
height: auto;
min-height: 100%;
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
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

strong {
  color: #52A411;
}

button {
  border: 0;
  background: #52A411;
  color: #fff;
  padding: 10px 15px;
  font-weight: bold;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    background: ${darken(0.07, '#52a411')};
  }
}

`;

export const QuestionBox = styled.div`
background: #fff;
padding: 25px;
border-radius: 4px;
margin-top: 25px;
background: ${props => props.isAutor ? '#8F8B8B' : '#fff'}
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
margin-top: 15px;
color: ${props => props.isAutor ? '#FFF' : '#959191'}
`;

export const StyledForm = styled(Form)`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 25px;

.formContainer {
width: 100%;
display: block;

  textarea {
    border-radius: 4px;
    border: 0;
    background: #fff;
    padding: 15px;
    margin: 5px 0;
    width: 100%;
    resize: none;
    font-size: 16px;
    }

    button {
      flex: 1;
      background-color: #EF1414;
      border: 0px;
      color: #fff;
      font-weight: bold;
      font-size: 17px;
      padding: 12px;
      margin-top: 10px;
      border-radius: 4px;
      margin-bottom: 10px;
      float: right;

      &:hover {
        background: ${darken(0.07, '#EF1414')};
      }
    }

    span {
      color: #313131;
      font-size: 13px;
      margin-bottom: 10px;
      margin-top: 2px;
      font-weight: bold;
    }

    a {
        color: #313131;
        font-size: 16px;
        text-align: right;
        margin-bottom: 2px;
        font-weight: bold;

        &:hover {
          color: #fff;
        }
      }
  }
`;
