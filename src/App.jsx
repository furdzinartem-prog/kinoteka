import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieSection from './components/MovieSection';

// 1. Моковые (тестовые) данные
const mockMovies = [
  { id: 1, title: 'Холоп' },
  { id: 2, title: 'Лед 2' },
  { id: 3, title: 'Марафон желаний' },
  { id: 4, title: 'Джульбарс' },
  { id: 5, title: 'Трансформеры' }
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // 2. Эмуляция поиска: фильтруем моковые данные по запросу
  const filteredMovies = mockMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const sectionTitle = searchQuery 
    ? `Результаты поиска: ${searchQuery}` 
    : "🔥 Популярные фильмы";

  return (
    <div className="app">
      <Header />
      <Hero onSearch={handleSearch} />
      
      
      <MovieSection title={sectionTitle} movies={filteredMovies} />
    </div>
  );
}

export default App;
