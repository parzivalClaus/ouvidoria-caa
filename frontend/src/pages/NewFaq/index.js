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
  question: Yup.string()
    .required('A pergunta é obrigatória'),
  answer: Yup.string()
    .required('A resposta é obrigatória'),
});

function NewFaq(props) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data, { resetForm }) {
    setLoading(true);
    const { answer, question } = data;
    const category = new URLSearchParams(props.location.search).get("category");

    try {
      await api.post('/faq', { question, answer, category });

      resetForm();

      setLoading(false);

      history.push('/');

      toast.success('Seu FAQ foi registrada com sucesso.');
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
              id="faqs"
              to="/faqs"
            >
              <MdArrowBack size={35} color="#333" />

              Voltar
            </NavLink>
          </span>

          <div className="formContainer">
            <div className="inputBox">
            </div>
            <Input name="question" placeholder="Pergunta" />
            <div className="inputBox">
            </div>
            <Input multiline={true} name="answer" placeholder="Resposta" />

            <button type="submit">{loading ? 'Carregando...' : 'ENVIAR'}</button>
          </div>
        </StyledForm>
      </Content>
    </Container>);
}

export default NewFaq;
