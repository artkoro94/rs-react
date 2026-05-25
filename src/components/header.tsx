import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <NavLink className="header__logo" to="/?page=1">
        Pokédex
      </NavLink>

      <nav className="header__nav">
        <NavLink className="header__link" to="/?page=1">
          Home
        </NavLink>

        <NavLink className="header__link" to="/about">
          About
        </NavLink>
      </nav>
    </header>
  );
};