import React from "react";

import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container, StyledForm } from './styles';
import { toast } from "react-toastify";
import history from '~/services/history';
import api from "~/services/api";

const schema = Yup.object().shape({
  name: Yup.string()
    .required('O nome é obrigatório')
  ,
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
  confirmPassword: Yup.string().required('A confirmação de senha é obrigatória'),
});


export default function Login() {
  const loading = useSelector((state) => state.auth.loading);

  async function handleSubmit(data, { resetForm }) {
    const { name, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error('As senhas digitadas não conferem.');
      return;
    }

    try {
      await api.post('/users', { name, email, password, confirmPassword });

      toast.success('Usuário cadastrado com sucesso, você já pode acessar normalmente.');

      history.push('/');
    } catch (err) {
      toast.error(err.response.data.error);
    }

    resetForm();

  }

  return (
    <Container>
      <StyledForm schema={schema} onSubmit={handleSubmit}>
        <div class="formContainer">

          <Input name="name" placeholder="Nome Completo" />

          <Input name="email" type="email" placeholder="E-mail" />

          <Input name="password" type="password" placeholder="Senha" />

          <Input name="confirmPassword" type="password" placeholder="Confirmação de Senha" />

          <button type="submit">{loading ? 'Carregando...' : 'CADASTRAR'}</button>

          <NavLink
            id="login"
            to="/"
          >
            Já tenho uma conta
            </NavLink>


        </div>
      </StyledForm>
    </Container>
  );
}

