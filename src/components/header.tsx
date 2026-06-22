import Link from 'next/link';

export const Header = () => {
  return (
  <header className="header">
    <Link className="header__logo" href="/">
      Pokédex
    </Link>

    <nav className="header__nav">
      <Link className="header__link" href="/">
        Home
      </Link>

      <Link className="header__link" href="/about">
        About
      </Link>
    </nav>
  </header>
  );
};