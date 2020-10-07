import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileRequest } from '~/store/modules/user/actions';


import Header from '~/components/Header';

import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdArrowBack } from 'react-icons/md';

import { NavLink } from 'react-router-dom';

import { Container, Content, StyledForm } from './styles';
import { toast } from 'react-toastify';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(),
  oldPassword: Yup.string(),
  password: Yup.string()
    .when('oldPassword', (oldPassword, field) =>
      oldPassword ? field.required('Por favor, digite a senha nova.') : field
    ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password ? field.required('a').oneOf([Yup.ref('password')], 'As senhas digitadas não conferem.') : field
  ),
});

export default function Profile() {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  async function handleSubmit(data, { resetForm }) {
    const { name, email, oldPassword, password, confirmPassword } = data;

    if (password.length < 6) {
      return toast.error('A senha precisa ter no mínimo 6 digitos');
    }

    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  return (
    <Container>
      <Header />
      <Content>
        <StyledForm schema={schema} onSubmit={handleSubmit}>

          <span className="back-button">

            <NavLink
              id="userDashboard"
              to="/user-dashboard"
            >
              <MdArrowBack size={35} color="#333" />

    Voltar
  </NavLink>
          </span>

          <div className="formContainer">

            <Input name="name" placeholder="Seu nome" value={name} onChange={e => setName(e.value)} />
            <Input name="email" placeholder="Seu email" value={email} onChange={e => setEmail(e.value)} />
            <Input name="oldPassword" type="password" placeholder="Sua senha atual" />
            <Input name="password" type="password" placeholder="Sua nova senha" />
            <Input name="confirmPassword" type="password" placeholder="Confirme sua nova senha" />

            <button type="submit">{loading ? 'Carregando...' : 'ENVIAR'}</button>
          </div>
        </StyledForm>
      </Content>
    </Container>
  )
}
