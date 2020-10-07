import styled from 'styled-components';
import { darken } from 'polished';
import { Form } from '@rocketseat/unform';

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


export const StyledForm = styled(Form)`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 80px 0;

span.back-button {
  width: 450px;
  margin: 0 auto;

  a {
    font-size: 17px;
    color: #333;
    font-weight: bold;
    display: flex;
  align-items: center;
  padding: 10px 0px;
  }
}

.formContainer {
  position: relative;
  width: 450px;
  display: flex;
  flex-direction: column;

  input, textarea {
    border-radius: 4px;
    border: 0;
    background: #fff;
    padding: 15px;
    margin: 5px 0;
    font-size: 17px;
    width: 100%;
    resize: none;
    }

    textarea {
      height: 400px;
      margin-top: 20px;
      letter-spacing: -1px;
    }

    button {
      background-color: #DC2626;
      border: 0px;
      width: 100%;
      color: #fff;
      font-weight: bold;
      font-size: 17px;
      padding: 12px;
      margin-top: 20px;
      border-radius: 4px;
      margin-bottom: 10px;

      &:hover {
        background: ${darken(0.07, '#DC2626')};
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
