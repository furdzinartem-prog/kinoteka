import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setContentType } from '../store/movieSlice';

function Header() {
  const dispatch = useDispatch();
  const favoritesCount = useSelector(state => state.movies.favorites.length);
  const contentType = useSelector(state => state.movies.contentType);

  return (
    <header className="header" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#1a1a1a', color: 'white' }}>
      <div className="logo" style={{ fontSize: '24px', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: '#ffcc00', textDecoration: 'none' }}>Кинотека</Link>
      </div>
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Главная</Link>
        
        {/* Кнопки переключения контента */}
        <button 
          onClick={() => dispatch(setContentType('TOP_POPULAR_ALL'))}
          style={{ background: 'none', border: 'none', color: contentType === 'TOP_POPULAR_ALL' ? '#ffcc00' : 'white', cursor: 'pointer', fontSize: '16px' }}
        >
          Фильмы
        </button>
        <button 
          onClick={() => dispatch(setContentType('TOP_250_TV_SHOWS'))}
          style={{ background: 'none', border: 'none', color: contentType === 'TOP_250_TV_SHOWS' ? '#ffcc00' : 'white', cursor: 'pointer', fontSize: '16px' }}
        >
          Сериалы
        </button>

        {/* Ссылка на страницу избранного */}
        <Link to="/favorites" style={{ color: '#ffcc00', textDecoration: 'none', fontWeight: 'bold' }}>
          ★ Избранное ({favoritesCount})
        </Link>
      </nav>
    </header>
  );
}

export default Header;
