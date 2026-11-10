
export interface IMovie {
  id: number;
  title: string;
  poster: string;
  genres: string[];
}

export interface IMovieDetails extends IMovie {
  description: string;
  year: number;
  rating: number | null; // Проверка на null
}

export type TMovieCard = Pick<IMovie, 'id' | 'title' | 'poster'>;

export type TMovieWithoutGenres = Omit<IMovie, 'genres'>;

export type TLoadingState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
