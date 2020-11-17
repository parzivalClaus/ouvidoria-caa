import React from 'react';

import Header from '~/components/Header';

import { NavLink } from 'react-router-dom';

import { Container, Content, CategoryBox, BottomBox } from './styles';

import history from '~/services/history';


function UserDashboard() {

  return (
    <Container>
      <Header />
      <Content>
        <CategoryBox>
          <div className="category">

            <NavLink
              id="ouvidoria"
              to="/create-manifestation?category=Ouvidoria"
            >
              <div class="category-image"></div>
              <span>Ouvidoria</span></NavLink>
          </div>

          <div className="category">

            <NavLink
              id="social"
              to="/create-manifestation?category=Social"
            >
              <div class="category-image"></div>
              <span>Social</span></NavLink>
          </div>

          <div className="category">
            <NavLink
              id="esportes"
              to="/create-manifestation?category=Esportes"
            >
              <div class="category-image"></div>

              <span>Esportes</span></NavLink>
          </div>

          <div className="category">
            <NavLink
              id="financeiro"
              to="/create-manifestation?category=Financeiro"
            >
              <div class="category-image"></div>

              <span>Financeiro</span></NavLink>
          </div>

          <div className="category">
            <NavLink
              id="tecnologia"
              to="/create-manifestation?category=Tecnologia"
            >
              <div class="category-image"></div>

              <span>Tecnologia</span></NavLink>
          </div>

        </CategoryBox>

        <BottomBox>
          <button onClick={() => history.push('faqs')}><span>? </span> Perguntas Frequentes</button>
        </BottomBox>
      </Content>
    </Container>

  );
}

export default UserDashboard;
