
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/tmdb";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieCast(movieId)
      .then((data) => setCast(data.cast))
      .catch((err) => setError(err.message));
  }, [movieId]);

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  if (cast.length === 0) {
    return <div>Інформація про акторів відсутня.</div>;
  }

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
          />
          <p>{actor.name}</p>
          <p>Роль: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
