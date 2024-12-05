import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../../api/tmdb";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation(); // Поточне розташування
  const navigate = useNavigate(); // Для кнопки "Go back"

  // Використовуємо useRef для збереження початкового значення location.state
  const backLinkRef = useRef(location.state?.from || "/");

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then((data) => setMovie(data))
      .catch((err) => setError(err.message));
  }, [movieId]);

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  if (!movie) {
    return <div>Завантаження...</div>;
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
      {/* Кнопка "Go back" */}
      <button
        onClick={() => navigate(backLinkRef.current)}
        style={{ marginBottom: "20px" }}
      >
        Go back
      </button>

      <div style={{ display: "flex", gap: "20px" }}>
        <img src={posterUrl} alt={title} style={{ width: "300px" }} />
        <div>
          <h1>{title}</h1>
          <p>
            <strong>Оригінальна назва:</strong> {original_title}
          </p>
          <p>
            <strong>Дата релізу:</strong> {release_date}
          </p>
          <p>
            <strong>Тривалість:</strong> {runtime} хвилин
          </p>
          <p>
            <strong>Рейтинг:</strong> {vote_average}/10
          </p>
          <p>
            <strong>Жанри:</strong> {genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Опис:</strong> {overview}
          </p>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Додатково</h2>
        <ul>
          <li>
            <Link to="cast" state={{ from: backLinkRef.current }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLinkRef.current }}>
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}

export default MovieDetailsPage;
