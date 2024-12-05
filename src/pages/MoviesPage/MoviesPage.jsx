import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../api/tmdb";
import MovieList from "../../components/MovieList/MovieList";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // Отримання параметра `query` з URL

  // Виконуємо пошук фільмів при зміні параметра `query`
  useEffect(() => {
    if (query) {
      fetchMoviesByQuery(query)
        .then((data) => {
          setMovies(data.results || []); // Оновлюємо список фільмів
          setError(null); // Скидаємо помилки
        })
        .catch((err) => {
          setError("Щось пішло не так. Спробуйте ще раз.");
          setMovies([]);
        });
    }
  }, [query]);

  // Обробка події пошуку
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.query.value.trim();

    if (searchQuery) {
      setSearchParams({ query: searchQuery }); // Оновлюємо параметр `query` в URL
    } else {
      setSearchParams({}); // Видаляємо параметр `query`, якщо поле порожнє
    }
  };

  return (
    <div>
      <h1>Пошук фільмів</h1>
      {/* Форма пошуку */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          placeholder="Введіть назву фільму"
          defaultValue={query} // Заповнюємо поле з URL параметра
        />
        <button type="submit">Шукати</button>
      </form>

      {/* Відображення помилок */}
      {error && <p>{error}</p>}

      {/* Відображення списку фільмів */}
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        query && <p>Фільми не знайдено за вашим запитом.</p>
      )}
    </div>
  );
}

export default MoviesPage;
