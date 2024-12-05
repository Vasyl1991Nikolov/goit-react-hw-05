// src/pages/MoviesPage/MoviesPage.jsx
import React, { useState } from 'react';
import { fetchMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    fetchMovies(query)
      .then((data) => setMovies(data.results))
      .catch((err) => setError(err.message));
  };

  return (
    <div>
      <h1>Поиск фильмов</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите название фильма"
      />
      <button onClick={handleSearch}>Искать</button>
      {error && <div>Ошибка: {error}</div>}
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
