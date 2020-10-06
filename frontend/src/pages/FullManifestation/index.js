import React, { useState, useEffect } from 'react';

import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import api from '~/services/api';

import { NavLink } from 'react-router-dom';

import { MdArrowBack } from 'react-icons/md';

import Header from '~/components/Header';

import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container, Content, Title, QuestionBox, QuestionHeader, QuestionMessage, StyledForm } from './styles';
import { toast } from 'react-toastify';

const schema = Yup.object().shape({
  message: Yup.string()
    .required('A mensagem é obrigatória'),
});

function FullManifestation({ history: navigation }) {
  const { manifestation } = navigation.location.state;
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleResolved() {
    try {
      await api.put(`/close-manifestation/${manifestation.protocol}`);

      toast.success('Sua manifestação foi finalizada.');

      history.push('/manifestations');

    } catch (err) {
      return toast.error('Não foi possível realizar essa ação');
    }
  }

  async function handleSubmit(data, { resetForm }) {
    const { message } = data;
    setLoading(true);
    resetForm();

    try {
      await api.post(`/answer/${manifestation.protocol}`, { title: 'Resposta', message });
      toast.success('Sua resposta foi cadastrada com sucesso!');
    } catch (err) {
      toast.error(err.response.data.error);
    }

    setLoading(false);
  }

  useEffect(() => {
    async function loadAnswers() {
      const answers = await api.get(`/answers/${manifestation.protocol}`);
      setAnswers(answers.data.rows);
    }

    loadAnswers();
  }, [manifestation.protocol, answers]);

  return (
    <Container>
      <Header />
      <Content>

        <span className="back-button">

          <NavLink
            id="manifestations"
            to="/manifestations"
          >
            <MdArrowBack size={35} color="#333" />

Voltar
</NavLink>
        </span>

        <Title>
          <h1>{manifestation.closed === 'true' ? <strong>[Resolvido] </strong> : null}{manifestation.title}</h1>
          {manifestation.closed !== 'true' ?
            <button onClick={handleResolved}>Marcar como resolvido</button>
            : null}

        </Title>

        <QuestionBox>
          <QuestionHeader>
            <p>{manifestation.creator.name}</p>
            <p className="date">{formatRelative(parseISO(manifestation.created_at), new Date(), { locale: pt })}</p>
          </QuestionHeader>
          <QuestionMessage>
            <p>{manifestation.message}</p>
          </QuestionMessage>
        </QuestionBox>

        {answers && answers.map(answers => (
          <QuestionBox isAutor={answers.creator_id !== manifestation.creator_id ? true : false}>
            <QuestionHeader>
              <p>{answers.creator.name}</p>
              <p className="date">{formatRelative(parseISO(answers.created_at), new Date(), { locale: pt })}</p>
            </QuestionHeader>
            <QuestionMessage isAutor={answers.creator_id !== manifestation.creator_id ? true : false}>
              <p>{answers.message}</p>
            </QuestionMessage>
          </QuestionBox>
        ))}

        {manifestation.closed !== 'true' ? (

          <StyledForm schema={schema} onSubmit={handleSubmit}>
            <div className="formContainer">
              <Input multiline={true} name="message" placeholder="Responder..." />
              <div className="inputBox">
              </div>

              <button type="submit">{loading ? 'Carregando...' : 'RESPONDER'}</button>

            </div>
          </StyledForm>

        ) : null}
      </Content>
    </Container>
  )
}

export default FullManifestation;
