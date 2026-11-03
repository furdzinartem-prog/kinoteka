import React from 'react';
import MovieCard from './MovieCard';

function MovieSection({ title, movies, onCardClick }) {
  return (
    <section className="movie-section" style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>{title}</h2>
      <div className="movie-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={() => onCardClick(movie.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
