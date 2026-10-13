import React from 'react';
import MovieCard from './MovieCard';

function MovieSection({ title, movies }) {
  return (
    <section className="movie-section">
      <h2>{title} <span style={{fontSize: '14px', color: '#c5c6c7', cursor: 'pointer'}}>Смотреть все →</span></h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
