// src/pages/HomePage/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies('popular')
      .then((data) => setMovies(data.results))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1>Популярные фильмы</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
