import { describe, test, expect } from '@jest/globals';
import movieReducer, { toggleFavorite, setContentType } from './movieSlice';
import { IMovie } from '../types';

describe('Синхронные тесты: movieSlice reducer', () => {
  const sampleMovie: IMovie = {
    id: 301,
    title: 'Матрица',
    poster: 'https://example.com/matrix.jpg',
    genres: ['фантастика', 'боевик'],
  };

  const secondMovie: IMovie = {
    id: 435,
    title: 'Зеленая миля',
    poster: 'https://example.com/greenmile.jpg',
    genres: ['драма'],
  };

  test('возвращает корректное начальное состояние при неизвестном экшене', () => {
    const initialState = movieReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState.favorites).toEqual([]);
    expect(initialState.contentType).toBe('TOP_POPULAR_ALL');
  });

  test('toggleFavorite: добавляет фильм в пустой список избранного (обычные данные)', () => {
    const baseState = movieReducer(undefined, { type: 'INIT' });
    const nextState = movieReducer(baseState, toggleFavorite(sampleMovie));

    expect(nextState.favorites).toHaveLength(1);
    expect(nextState.favorites[0]).toEqual(sampleMovie);
  });

  test('toggleFavorite: удаляет фильм при повторном вызове и сохраняет остальные', () => {
    const baseState = movieReducer(undefined, { type: 'INIT' });
    const stateWithTwo = movieReducer(
      movieReducer(baseState, toggleFavorite(sampleMovie)),
      toggleFavorite(secondMovie)
    );

    const stateAfterRemove = movieReducer(stateWithTwo, toggleFavorite(sampleMovie));
    expect(stateAfterRemove.favorites).toHaveLength(1);
    expect(stateAfterRemove.favorites[0]).toEqual(secondMovie);
  });

  test('setContentType: меняет категорию контента на обычных и пустых данных', () => {
    const baseState = movieReducer(undefined, { type: 'INIT' });

    const state1 = movieReducer(baseState, setContentType('TOP_250_TV_SHOWS'));
    expect(state1.contentType).toBe('TOP_250_TV_SHOWS');

    const state2 = movieReducer(state1, setContentType(''));
    expect(state2.contentType).toBe('');
  });
});
