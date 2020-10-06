import React, { useState } from 'react';

import api from '~/services/api';
import history from '~/services/history';

import Header from '~/components/Header';

import { MdArrowBack } from 'react-icons/md';

import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { NavLink } from 'react-router-dom';

import { Container, Content, StyledForm } from './styles';
import { toast } from 'react-toastify';

const schema = Yup.object().shape({
  title: Yup.string()
    .required('O título é obrigatório'),
  message: Yup.string()
    .required('A mensagem é obrigatória'),
});

function CreateManifestation(props) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data, { resetForm }) {
    setLoading(true);
    const { title, message } = data;
    const category = new URLSearchParams(props.location.search).get("category");

    try {
      await api.post('/manifestation', { type: 'question', title, message, category });

      resetForm();

      setLoading(false);

      history.push('/');

      toast.success('Sua manifestação foi registrada com sucesso. O número de protocolo foi encaminhado para o e-mail de cadastro.');
    } catch (err) {
      setLoading(false);
      return toast.error(err.response.data.error);
    }
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
            <div className="inputBox">
            </div>
            <Input name="title" placeholder="Assunto" />
            <div className="inputBox">
            </div>
            <Input multiline={true} name="message" placeholder="Detalhes" />

            <button type="submit">{loading ? 'Carregando...' : 'ENVIAR'}</button>
          </div>
        </StyledForm>
      </Content>
    </Container>);
}

export default CreateManifestation;
