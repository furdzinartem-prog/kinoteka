import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MovieModal from './components/MovieModal';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  return (
    <div className="app">
      <Header />
      
      {/* Настройка маршрутов (React Router) */}
      <Routes>
        <Route path="/" element={<HomePage onOpenModal={setSelectedMovieId} />} />
        <Route path="/favorites" element={<FavoritesPage onOpenModal={setSelectedMovieId} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Модалка общая для всех страниц */}
      {selectedMovieId && (
        <MovieModal id={selectedMovieId} onClose={() => setSelectedMovieId(null)} />
      )}
    </div>
  );
}

export default App;
