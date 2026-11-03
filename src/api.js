const BASE_URL = 'https://kinopoiskapiunofficial.tech/api';
const API_KEY = '1ec1fb35-b70e-4c14-b86d-75efb67ad405';

async function fetchClient(endpoint) {
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

export const api = {
  // Теперь функция принимает тип: TOP_POPULAR_ALL (фильмы) или TOP_250_TV_SHOWS (сериалы)
  getTopMovies: async (type = 'TOP_POPULAR_ALL') => {
    const data = await fetchClient(`/v2.2/films/collections?type=${type}&page=1`);
    return data.items.map(f => ({
      id: f.kinopoiskId,
      title: f.nameRu || f.nameOriginal,
      poster: f.posterUrlPreview,
      genres: f.genres?.map(g => g.genre) || []
    }));
  },
  searchMovies: async (query) => {
    const data = await fetchClient(`/v2.1/films/search-by-keyword?keyword=${query}`);
    return data.films.map(f => ({
      id: f.filmId,
      title: f.nameRu || f.nameEn,
      poster: f.posterUrlPreview,
      genres: f.genres?.map(g => g.genre) || []
    }));
  },
  getMovieDetails: (id) => fetchClient(`/v2.2/films/${id}`),
  getMovieStaff: (id) => fetchClient(`/v1/staff?filmId=${id}`)
};
