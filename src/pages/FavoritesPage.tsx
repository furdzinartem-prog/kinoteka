
import { useAppSelector } from '../store/hooks';
import MovieSection from '../components/MovieSection';

interface FavoritesPageProps {
  onOpenModal: (id: number) => void;
}

function FavoritesPage({ onOpenModal }: FavoritesPageProps) {
  const favorites = useAppSelector(state => state.movies.favorites);

  return (
    <div style={{ padding: '20px' }}>
      {favorites.length === 0 ? (
        <h2>Список избранного пуст</h2>
      ) : (
        <MovieSection title="Мое избранное" movies={favorites} onCardClick={onOpenModal} />
      )}
    </div>
  );
}

export default FavoritesPage;
