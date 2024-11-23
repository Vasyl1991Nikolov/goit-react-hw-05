// src/pages/MovieDetailsPage/MovieDetailsPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getMovieReviews } from '../../api/tmdb';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [credits, setCredits] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Состояния для управления видимостью секций
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await getMovieDetails(movieId);
      const credits = await getMovieCredits(movieId);
      const reviews = await getMovieReviews(movieId);

      setMovieDetails(details);
      setCredits(credits);
      setReviews(reviews);
      setLoading(false);
    };

    fetchMovieDetails();
  }, [movieId]);

  // Функции для переключения видимости
  const toggleCast = () => setShowCast(prevState => !prevState);
  const toggleReviews = () => setShowReviews(prevState => !prevState);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movieDetails.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
        width="200"
      />
      <p>{movieDetails.overview}</p>

      {/* Кнопка для отображения/скрытия актеров */}
      <button onClick={toggleCast}>
        {showCast ? 'Hide Cast' : 'Show Cast'}
      </button>
      {showCast && (
        <div>
          <h2>Cast</h2>
          <ul>
            {credits.map((actor) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Кнопка для отображения/скрытия отзывов */}
      <button onClick={toggleReviews}>
        {showReviews ? 'Hide Reviews' : 'Show Reviews'}
      </button>
      {showReviews && (
        <div>
          <h2>Reviews</h2>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <strong>{review.author}</strong>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
