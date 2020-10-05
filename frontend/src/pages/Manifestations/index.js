import React, { useState, useEffect } from 'react';

import Header from '~/components/Header';

import { Input } from '@rocketseat/unform';

import api from '~/services/api';

import { Container, Content, Filters, List, FiltersBox, SearchBox, ManifestationBox, Title, ContentLine } from './styles';

import { toast } from 'react-toastify';

function Manifestations() {
  const [q, setQ] = useState('');
  const [closed, setClosed] = useState('');
  const [manifestations, setManifestations] = useState([]);
  const [answersCount, setAnswersCounts] = useState(2);

  useEffect(() => {


    async function loadManifestations() {
      try {

        const result = await api.get(`/manifestation?closed=${closed}`);

        setManifestations(result.data.rows);

      } catch (err) {
        return toast.error(err.response.data.error);
      }
    }

    loadManifestations();
  }, []);

  return (
    <Container>
      <Header />
      <Content>

        <Filters>
          <FiltersBox>
            <button className="btnOpen" onClick={() => { }} >Abertas</button>
            <button className="btnDone" onClick={() => { }} >Concluídas</button>
            <button className="btnAll" onClick={() => { }} >Todas</button>
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
                <p>X</p>
                <p>{manifestation.title}</p>
                <p>{manifestation.category}</p>
                <p>{manifestation.answers}</p>
                <p>Duas horas atrás</p>
              </ContentLine>
            </ManifestationBox>
          ))}



        </List>

      </Content>
    </Container >
  );
}

export default Manifestations;
