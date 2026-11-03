import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  contentType: 'TOP_POPULAR_ALL', // по умолчанию грузим популярные фильмы
  savedMoviesData: [], // Чтобы избранные фильмы отображались на отдельной странице
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const exists = state.favorites.find(fav => fav.id === movie.id);
      if (exists) {
        state.favorites = state.favorites.filter(fav => fav.id !== movie.id);
      } else {
        state.favorites.push(movie);
      }
    },
    setContentType: (state, action) => {
      state.contentType = action.payload;
    }
  },
});

export const { toggleFavorite, setContentType } = movieSlice.actions;
export default movieSlice.reducer;
