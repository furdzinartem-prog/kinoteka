import { useState, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import Hero from '../components/Hero';
import MovieSection from '../components/MovieSection';
import { api } from '../api';
import { IMovie, TLoadingState } from '../types';

const GENRES = ['Все', 'комедия', 'драма', 'фантастика', 'триллер', 'боевик'];

interface HomePageProps {
  onOpenModal: (id: number) => void;
}

function HomePage({ onOpenModal }: HomePageProps) {
  const contentType = useAppSelector(state => state.movies.contentType);
  const [loadingState, setLoadingState] = useState<TLoadingState<IMovie[]>>({ status: 'idle' });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Все');

  const loadMovies = async () => {
    setLoadingState({ status: 'loading' });
    try {
      const data = await api.getTopMovies(contentType);
      setLoadingState({ status: 'success', data });
    } catch (err) {
      setLoadingState({ status: 'error', error: err instanceof Error ? err.message : 'Ошибка' });
    }
  };

  useEffect(() => {
    loadMovies();
    setSearchQuery('');
  }, [contentType]); 

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query) {
      loadMovies();
      return;
    }
    setLoadingState({ status: 'loading' });
    try {
      const data = await api.searchMovies(query);
      setLoadingState({ status: 'success', data });
    } catch (err) {
      setLoadingState({ status: 'error', error: err instanceof Error ? err.message : 'Ошибка' });
    }
  };

  let content;
  if (loadingState.status === 'loading') {
    content = <h2 style={{textAlign: 'center'}}>⏳ Загрузка...</h2>;
  } else if (loadingState.status === 'error') {
    content = <div style={{textAlign: 'center', color: 'red'}}>Ошибка: {loadingState.error}</div>;
  } else if (loadingState.status === 'success') {
    const filteredMovies = selectedGenre === 'Все' 
      ? loadingState.data 
      : loadingState.data.filter(m => m.genres.includes(selectedGenre.toLowerCase()));
      
    content = <MovieSection 
      title={searchQuery ? 'Результаты поиска' : (contentType === 'TOP_250_TV_SHOWS' ? "🔥 Лучшие сериалы" : "🔥 Популярные фильмы")} 
      movies={filteredMovies}
      onCardClick={onOpenModal}
    />;
  }

  return (
    <>
      <Hero onSearch={handleSearch} isLoading={loadingState.status === 'loading'} />
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
      {content}
    </>
  );
}

export default HomePage;
