import { useTranslations } from 'next-intl';
import { Link } from '../i18n/navigation';

export const Header = () => {
  const t = useTranslations('Header');

  return (
    <header className="header">
      <Link className="header__logo" href="/">
        Pokédex
      </Link>

      <nav className="header__nav">
        <Link className="header__link" href="/">
          {t('home')}
        </Link>

        <Link className="header__link" href="/about">
          {t('about')}
        </Link>
      </nav>
    </header>
  );
};