// src/pages/MovieDetailsPage/Reviews/Reviews.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api/tmdb';

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieReviews(movieId)
      .then((data) => setReviews(data.results))
      .catch((err) => setError(err.message));
  }, [movieId]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <strong>{review.author}</strong>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default Reviews;
