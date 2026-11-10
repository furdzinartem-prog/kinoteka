import { IMovie } from './types';

const BASE_URL = 'https://kinopoiskapiunofficial.tech/api';
const API_KEY = '1ec1fb35-b70e-4c14-b86d-75efb67ad405';

async function fetchClient(endpoint: string): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
  return response.json();
}


function extractArray(data: unknown, targetKey: string): unknown[] {
  if (typeof data === 'object' && data !== null) {
    for (const [key, value] of Object.entries(data)) {
      if (key === targetKey && Array.isArray(value)) {
        return value;
      }
    }
  }
  return [];
}


function parseMovie(item: unknown): IMovie {
  let id = 0;
  let title = 'Без названия';
  let poster = '';
  let genres: string[] = [];

  if (typeof item === 'object' && item !== null) {
    for (const [key, value] of Object.entries(item)) {
      if ((key === 'kinopoiskId' || key === 'filmId') && typeof value === 'number') id = value;
      if ((key === 'nameRu' || key === 'nameOriginal' || key === 'nameEn') && typeof value === 'string' && title === 'Без названия') title = value;
      if (key === 'posterUrlPreview' && typeof value === 'string') poster = value;
      
      if (key === 'genres' && Array.isArray(value)) {
        genres = value.map(g => {
          if (typeof g === 'object' && g !== null && 'genre' in g && typeof g.genre === 'string') {
            return g.genre;
          }
          return '';
        }).filter(Boolean);
      }
    }
  }

  return { id, title, poster, genres };
}

export const api = {
  getTopMovies: async (type: string = 'TOP_POPULAR_ALL'): Promise<IMovie[]> => {
    const data = await fetchClient(`/v2.2/films/collections?type=${type}&page=1`);
    const items = extractArray(data, 'items');
    return items.map(parseMovie);
  },
  searchMovies: async (query: string): Promise<IMovie[]> => {
    const data = await fetchClient(`/v2.1/films/search-by-keyword?keyword=${query}`);
    const films = extractArray(data, 'films');
    return films.map(parseMovie);
  },
  getMovieDetails: async (id: number): Promise<unknown> => {
    return fetchClient(`/v2.2/films/${id}`);
  },
  getMovieStaff: async (id: number): Promise<unknown> => {
    return fetchClient(`/v1/staff?filmId=${id}`);
  }
};
