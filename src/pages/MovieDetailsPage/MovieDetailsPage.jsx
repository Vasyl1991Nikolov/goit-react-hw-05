// src/pages/MovieDetailsPage/MovieDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/tmdb';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then((data) => setMovie(data))
      .catch((err) => setError(err.message));
  }, [movieId]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!movie) {
    return <div>Загрузка...</div>;
  }

  const {
    title,
    original_title,
    overview,
    release_date,
    genres,
    vote_average,
    runtime,
    poster_path,
  } = movie;

  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <img src={posterUrl} alt={title} style={{ width: '300px' }} />
        <div>
          <h1>{title}</h1>
          <p>
            <strong>Оригинальное название:</strong> {original_title}
          </p>
          <p>
            <strong>Дата релиза:</strong> {release_date}
          </p>
          <p>
            <strong>Продолжительность:</strong> {runtime} минут
          </p>
          <p>
            <strong>Рейтинг:</strong> {vote_average}/10
          </p>
          <p>
            <strong>Жанры:</strong> {genres.map((genre) => genre.name).join(', ')}
          </p>
          <p>
            <strong>Описание:</strong> {overview}
          </p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Дополнительно</h2>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}

export default MovieDetailsPage;
