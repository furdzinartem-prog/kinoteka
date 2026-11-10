import { IMovie } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite } from '../store/movieSlice';

interface MovieCardProps {
  movie: IMovie;
  onClick: (id: number) => void;
}

function MovieCard({ movie, onClick }: MovieCardProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(state => 
    state.movies.favorites.some(fav => fav.id === movie.id)
  );

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie));
  };

  return (
    <div 
      className="movie-card" 
      onClick={() => onClick(movie.id)}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}
    >
      <img 
        src={movie.poster} 
        alt={movie.title} 
        className="movie-poster" 
        style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
      />
      <h3 className="movie-title" style={{ fontSize: '16px', margin: '0', flexGrow: 1 }}>
        {movie.title}
      </h3>
      <button 
        onClick={handleFavorite}
        style={{ 
          padding: '8px 12px', 
          borderRadius: '5px', 
          border: 'none', 
          background: isFavorite ? '#ffcc00' : '#444', 
          color: isFavorite ? '#000' : '#fff', 
          cursor: 'pointer',
          fontWeight: 'bold',
          width: '100%',
          marginTop: 'auto'
        }}
      >
        {isFavorite ? '★ В избранном' : '☆ В избранное'}
      </button>
    </div>
  );
}

export default MovieCard;
