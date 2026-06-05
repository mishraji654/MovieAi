import axios from "axios";

import {
  API_KEY,
  BASE_URL,
} from "../config/apiconfig";

// Get Movies
export const getMovies = async (
  params = ""
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}${params}`
    );

    return response.data.results;
  } catch (error) {
    console.log("getMovies Error:", error);
    return [];
  }
};

// Trending Movies
export const getTrendingMovies =
  async () => {
    try {
      const response =
        await axios.get(
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
        );

      return response.data.results;
    } catch (error) {
      console.log("Trending Error:", error);
      return [];
    }
  };

// Movies By Genre
export const getMoviesByGenre =
  async (genreId) => {
    try {
      const response =
        await axios.get(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
        );

      return response.data.results;
    } catch (error) {
      console.log("Genre Error:", error);
      return [];
    }
  };

// Search Movies
export const searchMovies =
  async (query) => {
    try {
      const response =
        await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
          )}`
        );

      return response.data.results;
    } catch (error) {
      console.log("Search Error:", error);
      return [];
    }
  };

// NEW FUNCTION
export const searchMovieByName =
  async (movieName) => {
    try {
      const response =
        await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            movieName
          )}`
        );

      return (
        response.data.results?.[0] ||
        null
      );
    } catch (error) {
      console.log(
        "Movie Search Error:",
        error
      );

      return null;
    }
  };