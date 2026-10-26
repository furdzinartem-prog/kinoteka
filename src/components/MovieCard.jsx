import React from 'react';

function MovieCard({ movie, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div className="movie-card" style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden', borderRadius: '10px', backgroundColor: '#222' }}>
      <div 
        onClick={onClick} 
        style={{ backgroundImage: `url(${movie.poster})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '350px' }}
      ></div>
      
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(); }}
        style={{
          position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)',
          border: 'none', color: isFavorite ? '#ffcc00' : 'white', fontSize: '24px', cursor: 'pointer', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <div onClick={onClick} style={{ padding: '15px', color: '#fff' }}>
        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px' }}>{movie.title}</div>
        <div style={{ fontSize: '13px', color: '#aaa', textTransform: 'capitalize' }}>
          {movie.genres.slice(0, 3).join(', ')}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;