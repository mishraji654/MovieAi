import React, {
  useContext,
} from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  IMAGE_URL,
} from "../config/apiconfig";

import {
  AppContext,
} from "../context/AppContext";

import {
  saveFavorites,
  saveDownloads,
} from "../services/storage";

export default function MovieCard({
  movie,
}) {
  const navigation =
    useNavigation();

  const {
    favorites,
    setFavorites,
    downloads,
    setDownloads,
  } = useContext(AppContext);

  // FAVORITES
  const addToFavorites =
    async () => {
      const exists =
        favorites.find(
          (item) =>
            item.id === movie.id
        );

      if (exists) return;

      const updated = [
        ...favorites,
        movie,
      ];

      setFavorites(updated);

      await saveFavorites(
        updated
      );
    };

  // DOWNLOADS
  const addToDownloads =
    async () => {
      const exists =
        downloads.find(
          (item) =>
            item.id === movie.id
        );

      if (exists) return;

      const updated = [
        ...downloads,
        movie,
      ];

      setDownloads(updated);

      await saveDownloads(
        updated
      );
    };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(
          "Detail",
          { movie }
        )
      }
      style={{
        width: 165,
        marginHorizontal: 8,
        marginBottom: 18,
      }}
    >
      {/* POSTER */}
      <View
        style={{
          position: "relative",
        }}
      >
        <Image
          source={{
            uri:
              IMAGE_URL +
              movie.poster_path,
          }}
          style={{
            width: 165,
            height: 240,
            borderRadius: 16,
          }}
        />

        {/* RATING */}
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor:
              "rgba(0,0,0,0.8)",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="star"
            size={14}
            color="gold"
          />

          <Text
            style={{
              color: "#fff",
              marginLeft: 4,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {movie.vote_average?.toFixed(
              1
            )}
          </Text>
        </View>

        {/* FAVORITE BUTTON */}
        <TouchableOpacity
          onPress={
            addToFavorites
          }
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor:
              "rgba(0,0,0,0.8)",
            padding: 8,
            borderRadius: 30,
          }}
        >
          <Ionicons
            name="heart"
            size={18}
            color="red"
          />
        </TouchableOpacity>

        {/* DOWNLOAD BUTTON */}
        <TouchableOpacity
          onPress={
            addToDownloads
          }
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor:
              "rgba(0,0,0,0.8)",
            padding: 8,
            borderRadius: 30,
          }}
        >
          <Ionicons
            name="download"
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* MOVIE NAME */}
      <Text
        numberOfLines={1}
        style={{
          color: "#fff",
          marginTop: 10,
          fontWeight: "bold",
          fontSize: 15,
        }}
      >
        {movie.title}
      </Text>

      {/* SUBTITLE */}
      <Text
        style={{
          color: "gray",
          marginTop: 3,
          fontSize: 12,
        }}
      >
        Trending Movie
      </Text>
    </TouchableOpacity>
  );
}