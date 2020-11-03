import React, { useState, useEffect } from 'react';

import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { useSelector } from 'react-redux';

import Header from '~/components/Header';

import { MdArrowBack, MdDone, MdSubject } from 'react-icons/md';

import { NavLink } from 'react-router-dom';

import { Input } from '@rocketseat/unform';

import history from '~/services/history';
import api from '~/services/api';

import { store } from '~/store';

import { Container, Content, Filters, List, FiltersBox, SearchBox, ManifestationBox, Title, ContentLine } from './styles';

import { toast } from 'react-toastify';

function Manifestations() {
  const [q, setQ] = useState('');
  const [closed, setClosed] = useState('');
  const [manifestations, setManifestations] = useState([]);
  const userId = useSelector((state) => state.user.profile.id);
  const { name, access_level } = store.getState().user.profile;


  useEffect(() => {


    async function loadManifestations() {
      try {
        if (access_level === 1) {
          const allManifestations = await api.get(`/manifestation`, { params: { closed, q, category: name } });
          //const allManifestations = await api.get(`/manifestation`, { params: { closed, q, id: userId } });
          console.tron.log(allManifestations.data.rows);

          const data = allManifestations.data.rows.map(question => ({
            ...question,
            created: formatRelative(parseISO(question.created_at), new Date(), { locale: pt }),
          }));

          setManifestations(data);

          return;
        }

        const allManifestations = await api.get(`/manifestation`, { params: { closed, q, id: userId } });

        const data = allManifestations.data.rows.map(question => ({
          ...question,
          created: formatRelative(parseISO(question.created_at), new Date(), { locale: pt }),
        }));

        setManifestations(data);

      } catch (err) {
        return toast.error(err.response.data.error);
      }
    }

    loadManifestations();
  }, [closed, q, userId]);

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

            <ManifestationBox onClick={() =>
              history.push(`/manifestation/${manifestation.protocol}`, {
                manifestation,
              })
            }>
              <Title>
                <strong>Status</strong>
                <strong>Manifestação</strong>
                <strong>Setor</strong>
                <strong>Data da Manifestação</strong>
              </Title>
              <ContentLine>
                <p>{manifestation.closed === 'true' ? <div className="iconStatus doneStatus"><MdDone size={25} color="#fff" /></div>
                  : <div className="iconStatus openStatus"><MdSubject size={25} color="#333" /></div>}</p>
                <p>{manifestation.title}</p>
                <p>{manifestation.category}</p>
                <p>{manifestation.created}</p>
              </ContentLine>
            </ManifestationBox>
          ))}



        </List>

      </Content>
    </Container >
  );
}

export default Manifestations;
