import React from 'react';
import { useSelector } from 'react-redux';
import MovieSection from '../components/MovieSection';

function FavoritesPage({ onOpenModal }) {
  // Получаем избранные фильмы из глобального хранилища
  const favorites = useSelector(state => state.movies.favorites);

  return (
    <div style={{ padding: '20px', minHeight: '60vh' }}>
      <h1 style={{ textAlign: 'center' }}>Мое избранное</h1>
      {favorites.length === 0 ? (
        <h2 style={{ textAlign: 'center', color: '#aaa', marginTop: '50px' }}>Вы еще не добавили ни одного фильма 😔</h2>
      ) : (
        <MovieSection 
          title={`Сохранено: ${favorites.length}`} 
          movies={favorites}
          onCardClick={onOpenModal}
        />
      )}
    </div>
  );
}

export default FavoritesPage;
