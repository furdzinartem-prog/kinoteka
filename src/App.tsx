import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage onOpenModal={setSelectedMovieId} />} />
        <Route path="/favorites" element={<FavoritesPage onOpenModal={setSelectedMovieId} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
      {selectedMovieId !== null && (
        <Modal movieId={selectedMovieId} onClose={() => setSelectedMovieId(null)} />
      )}
    </>
  );
}

export default App;
