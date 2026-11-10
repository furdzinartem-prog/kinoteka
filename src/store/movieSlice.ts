import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../types';

interface IMovieState {
  favorites: IMovie[];
  contentType: string;
  savedMoviesData: IMovie[];
}

const initialState: IMovieState = {
  favorites: [],
  contentType: 'TOP_POPULAR_ALL',
  savedMoviesData: [],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<IMovie>) => {
      const movie = action.payload;
      const exists = state.favorites.find(fav => fav.id === movie.id);
      if (exists) {
        state.favorites = state.favorites.filter(fav => fav.id !== movie.id);
      } else {
        state.favorites.push(movie);
      }
    },
    setContentType: (state, action: PayloadAction<string>) => {
      state.contentType = action.payload;
    }
  },
});

export const { toggleFavorite, setContentType } = movieSlice.actions;
export default movieSlice.reducer;
