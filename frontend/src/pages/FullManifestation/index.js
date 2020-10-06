import React, { useState, useEffect } from 'react';

import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { NavLink } from 'react-router-dom';

import { MdArrowBack } from 'react-icons/md';

import Header from '~/components/Header';

import { Container, Content, Title, QuestionBox, QuestionHeader, QuestionMessage } from './styles';

function FullManifestation({ history: navigation }) {
  const { manifestation } = navigation.location.state;
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function loadAnswers() {
      const answers = await api.get(`/answers/${manifestation.protocol}`);
      setAnswers(answers.data.rows);
    }

    loadAnswers();
  }, [manifestation.protocol]);

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
          <QuestionBox>
            <QuestionHeader>
              <p>{answers.creator.name}</p>
              <p className="date">{formatRelative(parseISO(answers.created_at), new Date(), { locale: pt })}</p>
            </QuestionHeader>
            <QuestionMessage>
              <p>{answers.message}</p>
            </QuestionMessage>
          </QuestionBox>
        ))}
      </Content>
    </Container>
  )
}

export default FullManifestation;
