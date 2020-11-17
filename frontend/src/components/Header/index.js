import React from 'react';

import { useDispatch } from 'react-redux';

import { store } from '~/store';

import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Wrapper, Logo, User } from './styles';

function Header() {
  const dispatch = useDispatch();
  const { name, access_level } = store.getState().user.profile;


  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Wrapper>
        <Logo>OUVIDORIA</Logo>
        <User access_level={access_level}>{name}

          <div className="user-submenu">

            {access_level === 0 ? (
              <>
                <NavLink
                  id="profile"
                  to="/profile"
                >
                  Meu perfil
            </NavLink>

                <NavLink
                  id="manifestations"
                  to="/manifestations"
                >
                  Minhas manifestações
            </NavLink>
              </>
            ) : null}

            {access_level === 1 ? (
              <NavLink
                id="faq"
                to="/faqs"
              >
                Perguntas Frequentes (FAQ)
              </NavLink>
            ) : null}


            <button onClick={handleSignOut}>Sair da ouvidoria</button>
          </div>


        </User>
      </Wrapper>
    </Container>
  )
}

export default Header;
