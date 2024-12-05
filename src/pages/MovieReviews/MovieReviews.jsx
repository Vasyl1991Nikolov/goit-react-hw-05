
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/tmdb";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieReviews(movieId)
      .then((data) => setReviews(data.results))
      .catch((err) => setError(err.message));
  }, [movieId]);

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  if (reviews.length === 0) {
    return <div>Відгуки відсутні.</div>;
  }

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <h4>Автор: {review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
