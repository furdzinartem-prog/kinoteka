import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setContentType } from '../store/movieSlice';

function Header() {
  const dispatch = useAppDispatch();
  const favoritesCount = useAppSelector(state => state.movies.favorites.length);
  const contentType = useAppSelector(state => state.movies.contentType);

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 30px', 
      background: '#1a1a1a', 
      color: 'white',
      borderBottom: '1px solid #333'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>Главная</Link>
        <Link to="/favorites" style={{ color: '#ffcc00', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>★ Избранное ({favoritesCount})</Link>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => dispatch(setContentType('TOP_POPULAR_ALL'))} 
          disabled={contentType === 'TOP_POPULAR_ALL'}
          style={{
            padding: '8px 20px',
            borderRadius: '20px',
            border: 'none',
            background: contentType === 'TOP_POPULAR_ALL' ? '#ffcc00' : '#333',
            color: contentType === 'TOP_POPULAR_ALL' ? '#000' : '#fff',
            fontWeight: 'bold',
            cursor: contentType === 'TOP_POPULAR_ALL' ? 'default' : 'pointer'
          }}
        >
          Фильмы
        </button>
        <button 
          onClick={() => dispatch(setContentType('TOP_250_TV_SHOWS'))} 
          disabled={contentType === 'TOP_250_TV_SHOWS'}
          style={{
            padding: '8px 20px',
            borderRadius: '20px',
            border: 'none',
            background: contentType === 'TOP_250_TV_SHOWS' ? '#ffcc00' : '#333',
            color: contentType === 'TOP_250_TV_SHOWS' ? '#000' : '#fff',
            fontWeight: 'bold',
            cursor: contentType === 'TOP_250_TV_SHOWS' ? 'default' : 'pointer'
          }}
        >
          Сериалы
        </button>
      </div>
    </header>
  );
}

export default Header;
