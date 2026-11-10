
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setContentType } from '../store/movieSlice';

function Header() {
  const dispatch = useAppDispatch();
  const favoritesCount = useAppSelector(state => state.movies.favorites.length);
  const contentType = useAppSelector(state => state.movies.contentType);

  return (
    <header style={{ display: 'flex', gap: '15px', padding: '15px', background: '#222', color: 'white' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Главная</Link>
      <Link to="/favorites" style={{ color: 'white', textDecoration: 'none' }}>★ Избранное ({favoritesCount})</Link>
      <button 
        onClick={() => dispatch(setContentType('TOP_POPULAR_ALL'))} 
        disabled={contentType === 'TOP_POPULAR_ALL'}
      >
        Фильмы
      </button>
      <button 
        onClick={() => dispatch(setContentType('TOP_250_TV_SHOWS'))} 
        disabled={contentType === 'TOP_250_TV_SHOWS'}
      >
        Сериалы
      </button>
    </header>
  );
}

export default Header;
