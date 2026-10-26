import React, { useState, useEffect } from 'react';
import { api } from '../api';

function MovieModal({ id, onClose }) {
  const [details, setDetails] = useState(null);
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieData, staffData] = await Promise.all([
          api.getMovieDetails(id),
          api.getMovieStaff(id)
        ]);
        setDetails(movieData);
        setStaff(staffData.filter(p => p.professionKey === 'ACTOR').slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#1a1a1a', padding: '30px', borderRadius: '15px', maxWidth: '600px', width: '90%', color: 'white', position: 'relative', maxHeight: '90vh', overflowY: 'auto'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', color: '#ffcc00', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✖</button>
        
        {isLoading && <div style={{textAlign:'center', margin: '50px 0'}}>⏳ Загрузка информации...</div>}
        {error && <div style={{color:'red'}}>Ошибка загрузки: {error}</div>}
        
        {details && !isLoading && (
          <>
            <h2 style={{marginTop: 0, color: '#ffcc00'}}>{details.nameRu || details.nameOriginal}</h2>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', fontSize: '14px', color: '#ccc' }}>
              <span>⭐ {details.ratingKinopoisk || 'Нет оценок'}</span>
              <span>📅 {details.year} год</span>
              <span>⏱ {details.filmLength ? `${details.filmLength} мин.` : 'Неизвестно'}</span>
            </div>
            <p style={{ lineHeight: '1.6', fontSize: '15px' }}>{details.description || 'Описание пока отсутствует.'}</p>
            
            <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '5px' }}>В главных ролях:</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              {staff.map(actor => (
                <li key={actor.staffId}>{actor.nameRu || actor.nameEn}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieModal;