import { useEffect, useState } from 'react';
import { api } from '../api';
import { TLoadingState } from '../types';

interface ModalProps {
  movieId: number;
  onClose: () => void;
}

interface IModalData {
  description: string;
  staffNames: string[];
}

function Modal({ movieId, onClose }: ModalProps) {
  const [loadingState, setLoadingState] = useState<TLoadingState<IModalData>>({ status: 'idle' });

  useEffect(() => {
    const fetchDetails = async () => {
      setLoadingState({ status: 'loading' });
      try {
        // Параллельный запрос (Promise.all)
        const [detailsData, staffData] = await Promise.all([
          api.getMovieDetails(movieId),
          api.getMovieStaff(movieId)
        ]);

        // Строгий ручной парсинг unknown для описания
        let description = 'Описание отсутствует';
        if (typeof detailsData === 'object' && detailsData !== null) {
          for (const [key, value] of Object.entries(detailsData)) {
            if (key === 'description' && typeof value === 'string') {
              description = value;
            }
          }
        }

        // Строгий ручной парсинг unknown для актеров
        const staffNames: string[] = [];
        if (Array.isArray(staffData)) {
          for (const person of staffData) {
            if (typeof person === 'object' && person !== null) {
              for (const [key, value] of Object.entries(person)) {
                if (key === 'nameRu' && typeof value === 'string' && value) {
                  staffNames.push(value);
                }
              }
            }
          }
        }

        setLoadingState({ 
          status: 'success', 
          data: { description, staffNames: staffNames.slice(0, 5) } 
        });
      } catch (err) {
        setLoadingState({ 
          status: 'error', 
          error: err instanceof Error ? err.message : 'Ошибка загрузки' 
        });
      }
    };

    fetchDetails();
  }, [movieId]);

  return (
    <div 
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} 
      onClick={onClose}
    >
      <div 
        style={{ background: '#222', color: 'white', padding: '20px', borderRadius: '8px', maxWidth: '500px', width: '100%' }} 
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ float: 'right', cursor: 'pointer', padding: '5px 10px' }}>✕</button>
        
        {loadingState.status === 'loading' && <h2>⏳ Загрузка...</h2>}
        {loadingState.status === 'error' && <h2 style={{ color: 'red' }}>{loadingState.error}</h2>}
        {loadingState.status === 'success' && (
          <>
            <h2>Описание</h2>
            <p>{loadingState.data.description}</p>
            <h3>В главных ролях:</h3>
            <ul>
              {loadingState.data.staffNames.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
