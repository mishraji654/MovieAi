import React, {
  useContext,
  useEffect,
} from "react";

import {
  FlatList,
  Text,
  View,
} from "react-native";

import { AppContext } from "../context/AppContext";

import { getFavorites } from "../services/storage";

import MovieCard from "../components/MovieCard";

export default function FavoritesScreen() {
  const {
    favorites,
    setFavorites,
  } = useContext(AppContext);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites =
    async () => {
      const data =
        await getFavorites();

      setFavorites(data);
    };

  if (favorites.length === 0) {
    return (
      <View>
        <Text>
          No Favorites Yet
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{
        backgroundColor: "#000",
      }}
      data={favorites}
      keyExtractor={(item) =>
        item.id.toString()
      }
      renderItem={({ item }) => (
        <MovieCard movie={item} />
      )}
    />
  );
}