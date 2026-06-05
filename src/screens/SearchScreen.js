import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import MovieCard from "../components/MovieCard";

import { searchMovies } from "../services/api";

export default function SearchScreen({
  navigation,
}) {
  const [query, setQuery] =
    useState("");

  const [movies, setMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (query.length > 0) {
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const data =
        await searchMovies(query);

      setMovies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#111",
        paddingTop: 50,
      }}
    >
      {/* Top Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          marginBottom: 15,
        }}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          style={{
            marginRight: 10,
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Search Input */}
        <TextInput
          placeholder="Search Movies..."
          placeholderTextColor="gray"
          value={query}
          onChangeText={setQuery}
          style={{
            flex: 1,
            backgroundColor: "#222",
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 12,
            color: "#fff",
            fontSize: 16,
          }}
        />
      </View>

      {/* Results */}
      <FlatList
        data={movies}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <MovieCard movie={item} />
        )}
        numColumns={2}
        contentContainerStyle={{
          padding: 10,
        }}
        ListEmptyComponent={
          !loading &&
          query.length > 0 && (
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                marginTop: 30,
              }}
            >
              No Movies Found
            </Text>
          )
        }
      />
    </View>
  );
}