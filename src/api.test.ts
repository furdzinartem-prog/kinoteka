import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { api } from './api';

describe('Асинхронные тесты: модуль api', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('getTopMovies: успешно загружает и валидирует список фильмов', async () => {
    const mockServerResponse = {
      items: [
        {
          kinopoiskId: 435,
          nameRu: 'Зеленая миля',
          posterUrlPreview: 'https://example.com/greenmile.jpg',
          genres: [{ genre: 'драма' }, { genre: 'фэнтези' }],
        },
      ],
    };

    jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(mockServerResponse), { status: 200 })
    );

    const result = await api.getTopMovies('TOP_POPULAR_ALL');

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 435,
      title: 'Зеленая миля',
      poster: 'https://example.com/greenmile.jpg',
      genres: ['драма', 'фэнтези'],
    });
  });

  test('getTopMovies: подставляет дефолтные значения при неверных типах данных от сервера', async () => {
    const brokenServerResponse = {
      items: [
        {
          kinopoiskId: 'не число',
          nameRu: null,
          genres: 'не массив',
        },
      ],
    };

    jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(brokenServerResponse), { status: 200 })
    );

    const result = await api.getTopMovies('TOP_POPULAR_ALL');

    expect(result).toEqual([
      {
        id: 0,
        title: 'Без названия',
        poster: '',
        genres: [],
      },
    ]);
  });

  test('getTopMovies: выбрасывает ошибку при статусе 500 от сервера', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ message: 'Server Error' }), { status: 500 })
    );

    await expect(api.getTopMovies('TOP_POPULAR_ALL')).rejects.toThrow();
  });

  test('searchMovies: возвращает пустой массив при пустом ответе', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ films: [] }), { status: 200 })
    );

    const result = await api.searchMovies('НесуществующийФильм');
    expect(result).toEqual([]);
  });
});
