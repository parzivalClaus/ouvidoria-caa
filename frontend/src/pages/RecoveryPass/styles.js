import styled from 'styled-components';
import { darken } from 'polished';
import { Form } from '@rocketseat/unform';

export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
background: #555555;

p {
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
}
`;

export const StyledForm = styled(Form)`
background: #82898B;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 80px 0;

.formContainer {
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;

  input {
    border-radius: 4px;
    border: 0;
    background: #fff;
    padding: 15px;
    margin: 5px 0;
    width: 100%;
    }

    button {
      background-color: #EF1414;
      border: 0px;
      width: 100%;
      color: #fff;
      font-weight: bold;
      font-size: 17px;
      padding: 12px;
      margin-top: 5px;
      border-radius: 4px;
      margin-bottom: 10px;

      &:hover {
        background: ${darken(0.07, '#EF1414')};
      }
    }

    span {
      color: #fff;
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

      a.btnLogin {
        background: #EF1414;
        text-align: center;
        color: #fff;
        padding: 10px;
        border-radius: 4px;
        text-transform: uppercase;
        margin-top: 10px;

        &:hover {
          background: ${darken(0.07, '#Ef1414')};
        }
      }
  }
`;
