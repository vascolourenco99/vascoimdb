import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import api from "./api/axioConfig";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Reviews from "./components/reviews/Reviews";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie]= useState([]);
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);

      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviews);
      
    } catch (e){
      console.log(e);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout />}>
          {movies && <Route path="/" element={<Home movies={movies} />} />}
        </Route>
        <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
        <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
