import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Hero from '../components/Hero';
import MovieSection from '../components/MovieSection';
import { api } from '../api';

const GENRES = ['Все', 'комедия', 'драма', 'фантастика', 'триллер', 'боевик'];

function HomePage({ onOpenModal }) {
  const contentType = useSelector(state => state.movies.contentType);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');

  const loadMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getTopMovies(contentType); // Передаем тип контента из Redux
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect следит за contentType. Если нажали "Сериалы", он автоматически загрузит сериалы.
  useEffect(() => {
    loadMovies();
    setSearchQuery(''); // Сбрасываем поиск при переключении вкладок
  }, [contentType]); 

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      loadMovies();
      return;
    }
    setIsLoading(true);
    try {
      const data = await api.searchMovies(query);
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMovies = selectedGenre === 'Все' 
    ? movies 
    : movies.filter(m => m.genres.includes(selectedGenre.toLowerCase()));

  return (
    <>
      <Hero onSearch={handleSearch} isLoading={isLoading} />
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', padding: '20px' }}>
        {GENRES.map(genre => (
          <button 
            key={genre} onClick={() => setSelectedGenre(genre)}
            style={{ padding: '8px 16px', background: selectedGenre === genre ? '#ffcc00' : '#333', color: selectedGenre === genre ? '#000' : '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer' }}
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </button>
        ))}
      </div>

      {isLoading && <h2 style={{textAlign: 'center'}}>⏳ Загрузка...</h2>}
      {error && <div style={{textAlign: 'center', color: 'red'}}>Ошибка: {error}</div>}
      
      {!isLoading && !error && (
        <MovieSection 
          title={searchQuery ? `Результаты поиска` : (contentType === 'TOP_250_TV_SHOWS' ? "🔥 Лучшие сериалы" : "🔥 Популярные фильмы")} 
          movies={filteredMovies}
          onCardClick={onOpenModal}
        />
      )}
    </>
  );
}

export default HomePage;
