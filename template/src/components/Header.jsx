import React from 'react';

function Header({ title = "網站標題", navItems = [] }) {
  return (
    <header className="site-header">
      <div className="wrapper">
        <a className="site-title" href="/" rel="author">
          {title}
        </a>
        <nav className="site-nav">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className={item.active ? 'active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;

