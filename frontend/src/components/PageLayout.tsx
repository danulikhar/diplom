import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

const navigationItems = [
  { to: '/', label: 'Главная', end: true },
  { to: '/templates', label: 'Готовые запросы' },
  { to: '/custom-prompt', label: 'Свой запрос' },
  { to: '/survey', label: 'Опрос' },
];

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar__inner">
          <NavLink className="brand" to="/">
            Генератор детских сказок
          </NavLink>

          <nav className="navigation" aria-label="Основная навигация">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  isActive ? 'navigation__link navigation__link--active' : 'navigation__link'
                }
                end={item.end}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="page">{children}</main>
    </div>
  );
}
