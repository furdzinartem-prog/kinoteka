import React from 'react';
import MovieCard from './MovieCard';

function MovieSection({ title, movies, favorites, onToggleFavorite, onCardClick }) {
  return (
    <section className="movie-section">
      <h2>{title}</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            isFavorite={favorites.includes(movie.id)}
            onToggleFavorite={() => onToggleFavorite(movie.id)}
            onClick={() => onCardClick(movie.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
