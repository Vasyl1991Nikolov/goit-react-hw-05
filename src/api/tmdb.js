import axios from 'axios';


const API_KEY = '4c7fcf47d2c48390101e2f304544a34b';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies(query) {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке фильмов');
  }
  return response.json();
}

export async function fetchMovieDetails(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке деталей фильма');
  }
  return response.json();
}

export async function fetchMovieCast(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке состава');
  }
  return response.json();
}

export async function fetchMovieReviews(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке отзывов');
  }
  return response.json();
}
