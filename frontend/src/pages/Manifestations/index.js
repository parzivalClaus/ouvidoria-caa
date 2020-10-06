import React, { useState, useEffect } from 'react';

import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Header from '~/components/Header';

import { MdArrowBack, MdDone, MdSubject } from 'react-icons/md';

import { NavLink } from 'react-router-dom';

import { Input } from '@rocketseat/unform';

import api from '~/services/api';

import { Container, Content, Filters, List, FiltersBox, SearchBox, ManifestationBox, Title, ContentLine } from './styles';

import { toast } from 'react-toastify';

function Manifestations() {
  const [q, setQ] = useState('');
  const [closed, setClosed] = useState('');
  const [manifestations, setManifestations] = useState([]);
  const [answersCount, setAnswersCounts] = useState();

  useEffect(() => {


    async function loadManifestations() {
      try {

        const allManifestations = await api.get(`/manifestation`, { params: { closed, q } });

        const questions = allManifestations.data.rows.filter(
          question => question.type === 'question'
        );

        const answers = allManifestations.data.rows.filter(
          answer => answer.type === 'answer'
        );

        const questionsWithAnswers = questions.map(question => {
          const counter = answers.filter(answer => answer.protocol === question.protocol).length;

          const lastReply = counter > 0 ? answers.reduce((a, b) => (a.created_at > b.created_at ? a.created_at : b.created_at)) : null;
          const formatedDate = counter > 0 ? formatRelative(parseISO(lastReply), new Date(), { locale: pt }) : '-';

          return {
            ...question,
            answers: counter,
            lastReply: formatedDate,
          }
        });


        setManifestations(questionsWithAnswers);

      } catch (err) {
        return toast.error(err.response.data.error);
      }
    }

    loadManifestations();
  }, [closed, q]);

  return (
    <Container>
      <Header />
      <Content>

        <span className="back-button">

          <NavLink
            id="userDashboard"
            to="/user-dashboard"
          >
            <MdArrowBack size={35} color="#333" />

Voltar
</NavLink>
        </span>

        <Filters>

          <FiltersBox>

            <button className="btnOpen" onClick={() => setClosed('false')} >Abertas</button>
            <button className="btnDone" onClick={() => setClosed('true')} >Concluídas</button>
            <button className="btnAll" onClick={() => setClosed('')} >Todas</button>
          </FiltersBox>
          <SearchBox>
            <Input
              name="search"
              type="text"
              placeholder="Pesquisar..."
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </SearchBox>
        </Filters>

        <List>

          {manifestations && manifestations.map(manifestation => (
            <ManifestationBox>
              <Title>
                <strong>Status</strong>
                <strong>Manifestação</strong>
                <strong>Setor</strong>
                <strong>Respostas</strong>
                <strong>Última resposta</strong>
              </Title>
              <ContentLine>
                <p>{manifestation.closed === 'true' ? <div className="iconStatus doneStatus"><MdDone size={25} color="#fff" /></div>
                  : <div className="iconStatus openStatus"><MdSubject size={25} color="#333" /></div>}</p>
                <p>{manifestation.title}</p>
                <p>{manifestation.category}</p>
                <p>{manifestation.answers}</p>
                <p>{manifestation.lastReply}</p>
              </ContentLine>
            </ManifestationBox>
          ))}



        </List>

      </Content>
    </Container >
  );
}

export default Manifestations;
