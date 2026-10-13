import React from 'react';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="movie-cover"></div>
      <div className="movie-info" style={{ height: '70px', padding: '10px', color: '#fff' }}>
        {/* Выводим название, чтобы показать работу фильтра */}
        <div style={{ fontWeight: 'bold' }}>{movie.title}</div>
      </div>
    </div>
  );
}

export default MovieCard;
