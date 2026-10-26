import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieSection from './components/MovieSection';
import MovieModal from './components/MovieModal';
import { api } from './api';

const GENRES = ['Все', 'комедия', 'драма', 'фантастика', 'триллер', 'боевик'];

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [favorites, setFavorites] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const loadTopMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getTopMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTopMovies();
  }, []); 


  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      loadTopMovies(); 
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.searchMovies(query);
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  
  const filteredMovies = selectedGenre === 'Все' 
    ? movies 
    : movies.filter(m => m.genres.includes(selectedGenre.toLowerCase()));

  return (
    <div className="app">
      <Header />
      <Hero onSearch={handleSearch} isLoading={isLoading} />
      
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', padding: '20px' }}>
        {GENRES.map(genre => (
          <button 
            key={genre} 
            onClick={() => setSelectedGenre(genre)}
            style={{ 
              padding: '8px 16px', 
              background: selectedGenre === genre ? '#ffcc00' : '#333', 
              color: selectedGenre === genre ? '#000' : '#fff', 
              border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' 
            }}
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </button>
        ))}
      </div>

      {isLoading && <h2 style={{textAlign: 'center', color: '#ffcc00'}}>⏳ Ищем фильмы...</h2>}
      
      
      {error && (
        <div style={{textAlign: 'center', color: '#ff6b6b', margin: '20px'}}>
          <p>Ошибка: {error}</p>
          <button onClick={searchQuery ? () => handleSearch(searchQuery) : loadTopMovies} style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
            Повторить запрос
          </button>
        </div>
      )}

      
      {!isLoading && !error && filteredMovies.length === 0 && (
        <h2 style={{textAlign: 'center', color: '#aaa'}}>По вашему запросу ничего не найдено 😔</h2>
      )}

      {!isLoading && !error && filteredMovies.length > 0 && (
        <MovieSection 
          title={searchQuery ? `Результаты поиска: ${searchQuery}` : "🔥 Популярные фильмы"} 
          movies={filteredMovies}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onCardClick={setSelectedMovieId}
        />
      )}

      
      {selectedMovieId && (
        <MovieModal id={selectedMovieId} onClose={() => setSelectedMovieId(null)} />
      )}
    </div>
  );
}

export default App;
