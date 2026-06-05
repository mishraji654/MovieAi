import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

import MovieCard from "../components/MovieCard";
import { getMoviesByGenre } from "../services/api";
import { moodGenres } from "../utils/constant";

export default function ResultScreen({ route }) {
  const { mood, aiMovies, title } = route.params || {};

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const loadMovies = async () => {
    try {
      const genreId = moodGenres[mood];

      console.log("Mood:", mood);
      console.log("Genre ID:", genreId);

      if (!genreId) {
        console.log("Invalid mood:", mood);
        return;
      }

      const data = await getMoviesByGenre(genreId);

      console.log("Movies Response:", data);

      setMovies(data || []);
    } catch (error) {
      console.log("Load Movies Error:", error);
    }
  };

  const init = async () => {
    try {
      console.log("Route Params:", route.params);

      if (aiMovies && aiMovies.length > 0) {
        setMovies(aiMovies);
        return;
      }

      if (mood) {
        await loadMovies();
      }
    } catch (error) {
      console.log("Result Screen Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#111",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 24,
          fontWeight: "bold",
          margin: 15,
        }}
      >
        {title || `${mood} Movies`}
      </Text>

      {movies.length === 0 ? (
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            marginTop: 30,
          }}
        >
          No movies found
        </Text>
      ) : (
        <FlatList
          data={movies}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
        />
      )}
    </View>
  );
}
