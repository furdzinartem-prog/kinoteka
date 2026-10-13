import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="header-logo">kino.teka</div>
      <nav className="header-nav">
        <a href="#movies">Фильмы</a>
        <a href="#series">Сериалы</a>
        
      </nav>
    </header>
  );
}

export default Header;
