import React from "react";

import {
  ScrollView,
  Image,
  Text,
  StyleSheet,
} from "react-native";

import { IMAGE_URL } from "../config/apiconfig.js";

export default function MovieDetailScreen({
  route,
}) {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri:
            IMAGE_URL +
            movie.poster_path,
        }}
        style={styles.poster}
      />

      <Text style={styles.title}>
        {movie.title}
      </Text>

      <Text style={styles.rating}>
        ⭐ {movie.vote_average}
      </Text>

      <Text style={styles.date}>
        Release:{" "}
        {movie.release_date}
      </Text>

      <Text style={styles.overview}>
        {movie.overview}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },

  poster: {
    width: "100%",
    height: 500,
    borderRadius: 20,
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },

  rating: {
    color: "yellow",
    fontSize: 18,
    marginTop: 10,
  },

  date: {
    color: "gray",
    marginTop: 5,
  },

  overview: {
    color: "white",
    marginTop: 20,
    lineHeight: 24,
  },
});