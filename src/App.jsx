// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";

// Ледачі завантаження компонентів
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("./pages/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./pages/MovieReviews/MovieReviews"));

function App() {
  return (
    <Router>
      <Navigation />
      <Suspense fallback={<div>Завантаження...</div>}>
        <Routes>
          {/* Головна сторінка */}
          <Route path="/" element={<HomePage />} />
          {/* Сторінка пошуку фільмів */}
          <Route path="/movies" element={<MoviesPage />} />
          {/* Сторінка деталей фільму */}
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            {/* Вкладені маршрути */}
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          {/* Сторінка 404 */}
          <Route path="*" element={<div>Сторінка не знайдена</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
