import React, { useState, useEffect } from 'react';

import Header from '~/components/Header';
import { Container, Content, Filters, FiltersBox, SearchBox, CustomAsyncSelect, FaqBox, FaqHeader, FaqMessage } from './styles';

import { MdArrowBack } from 'react-icons/md';

import { NavLink } from 'react-router-dom';

import { Input } from '@rocketseat/unform';

import { store } from '~/store';

import api from '~/services/api';

function Faqs() {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [faqs, setFaqs] = useState([]);
  const { access_level } = store.getState().user.profile;

  async function loadFaqs(q) {
    const res = await api.get(`faq`);

    return new Promise((resolve) => {
      resolve(
        res.data.rows.map((st) => {
          return {
            value: st.id,
            label: st.category,
            ...st,
          };
        })
      );
    });
  }

  useEffect(() => {
    async function loadFaqs() {
      const faqs = await api.get(`/faq`, { params: { q, category: category.category } });
      setFaqs(faqs.data.rows);
    }

    loadFaqs();
  }, [q, category]);


  return <Container>
    <Header />
    <Content>

      {!(access_level !== 0) ? (
        <span className="back-button">

          <NavLink
            id="userDashboard"
            to="/user-dashboard"
          >
            <MdArrowBack size={35} color="#333" />

Voltar
</NavLink>
        </span>
      ) : (
          <span className="back-button">

            <NavLink
              id="manifestations"
              to="/manifestations"
            >
              <MdArrowBack size={35} color="#333" />

Voltar
</NavLink>
          </span>
        )}



      <Filters>

        <FiltersBox>

          <h1>Perguntas Frequentes (FAQ)</h1>

          <CustomAsyncSelect
            isSearchable
            defaultOptions
            loadOptions={(e) => loadFaqs(e)}
            defaultValue={{
              label: "",
              value: "",
            }}
            onChange={(e) => setCategory(e)}
            placeholder=""
            name="faqs"
          />

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

      {faqs && faqs.map(faq => (
        <FaqBox>
          <FaqHeader>
            <p>{faq.question}</p>
          </FaqHeader>
          <FaqMessage>
            <p>{faq.answer}</p>
          </FaqMessage>
        </FaqBox>
      ))}



    </Content>
  </Container>;
}

export default Faqs;
