// src/pages/MovieDetailsPage/Cast/Cast.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../api/tmdb';

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieCast(movieId)
      .then((data) => setCast(data.cast))
      .catch((err) => setError(err.message));
  }, [movieId]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>{actor.name}</li>
      ))}
    </ul>
  );
}

export default Cast;
