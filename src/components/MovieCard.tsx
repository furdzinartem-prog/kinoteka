
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
    <div className="movie-card" onClick={() => onClick(movie.id)}>
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <button onClick={handleFavorite}>
        {isFavorite ? '★ В избранном' : '☆ В избранное'}
      </button>
    </div>
  );
}

export default MovieCard;
