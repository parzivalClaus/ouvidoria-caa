import React from "react";

import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, StyledForm } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});


export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <StyledForm schema={schema} onSubmit={handleSubmit}>
        <div className="formContainer">
          <div className="inputBox">
          </div>
          <Input name="email" type="email" placeholder="E-mail" />
          <div className="inputBox">
          </div>
          <Input name="password" type="password" placeholder="Senha" />

          <button type="submit">{loading ? 'Carregando...' : 'ACESSAR'}</button>

          <NavLink
            id="register"
            to="/register"
          >
            Cadastrar
            </NavLink>

          <NavLink
            id="recoveryPass"
            to="/recovery-pass"
          >
            Recuperar senha
            </NavLink>
        </div>
      </StyledForm>
    </Container>
  );
}

