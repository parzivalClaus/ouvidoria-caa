import React from 'react';

import { useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Wrapper, Logo, User } from './styles';

function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Wrapper>
        <Logo>OUVIDORIA</Logo>
        <User>Claudio

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
