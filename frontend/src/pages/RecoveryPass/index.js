import React, { useState, useEffect } from "react";

import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';

import { Container, StyledForm } from './styles';
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function RecoveryPass(props) {
  const email = new URLSearchParams(props.location.search).get("email");
  const activeCode = new URLSearchParams(props.location.search).get("activeCode");

  const [msg, setMsg] = useState('');
  const loading = useSelector((state) => state.auth.loading);

  async function handleSubmit(data, { resetForm }) {

    const { email } = data;
    resetForm();
    try {
      await api.post('recovery-pass', {
        email,
      });

      setMsg('Verifique sua caixa de e-mails para continuar com a recuperação de senha.');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function newPass() {
    try {
      await api.get(`recovery-pass?email=${email}&activeCode=${activeCode}`);

      setMsg('Sua nova senha foi enviada para o e-mail. Para sua segurança, altera-a após o primeiro acesso');
    } catch (err) {
      toast.error(err.response.data.error);
      history.push('/recovery-pass');
    }
  }

  useEffect(() => {
    if (!email && !activeCode) {
      return null;
    }

    newPass();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>



      <StyledForm schema={schema} onSubmit={handleSubmit}>
        <div class="formContainer">

          <p>{msg}</p>

          {!email && !activeCode ? (
            <>
              <Input name="email" type="email" placeholder="E-mail" />

              <button type="submit">{loading ? 'Carregando...' : 'ENVIAR'}</button>



              <NavLink
                id="login"
                to="/"
              >
                Ir para o login
            </NavLink>
            </>
          ) : (
              <>
                <NavLink
                  id="login"
                  to="/"
                  className="btnLogin"
                >Ir para o login</NavLink>
              </>
            )}

        </div>
      </StyledForm>

    </Container>
  );
}

