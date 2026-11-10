
import MovieCard from './MovieCard';
import { IMovie } from '../types';

interface MovieSectionProps {
  title: string;
  movies: IMovie[];
  onCardClick: (id: number) => void;
}

function MovieSection({ title, movies, onCardClick }: MovieSectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={onCardClick} />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
