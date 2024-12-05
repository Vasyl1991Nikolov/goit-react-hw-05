// src/components/Navigation/Navigation.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink to="/" end>
        Главная
      </NavLink>
      <NavLink to="/movies">Фильмы</NavLink>
    </nav>
  );
}

export default Navigation;
