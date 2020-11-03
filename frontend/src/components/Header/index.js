import React from 'react';

import { useDispatch } from 'react-redux';

import { store } from '~/store';

import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Wrapper, Logo, User } from './styles';

function Header() {
  const dispatch = useDispatch();
  const { name } = store.getState().user.profile;

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Wrapper>
        <Logo>OUVIDORIA</Logo>
        <User>{name}

          <div className="user-submenu">
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

            <button onClick={handleSignOut}>Sair da ouvidoria</button>
          </div>
        </User>
      </Wrapper>
    </Container>
  )
}

export default Header;
