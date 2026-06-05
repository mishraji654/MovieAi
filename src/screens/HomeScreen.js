// HomeScreen.js

import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";

import { Modal, Pressable } from "react-native";

import { signOut } from "firebase/auth";

import { auth } from "../services/firebase";

import { getMovies, getTrendingMovies } from "../services/api";

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  const [sections, setSections] = useState([]);

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const [
        trending,
        hollywood,
        bollywood,
        tamil,
        telugu,
        action,
        comedy,
        horror,
        romance,
        sciFi,
      ] = await Promise.all([
        getTrendingMovies(),

        getMovies("&with_original_language=en"),

        getMovies("&with_original_language=hi"),

        getMovies("&with_original_language=ta"),

        getMovies("&with_original_language=te"),

        getMovies("&with_genres=28"),

        getMovies("&with_genres=35"),

        getMovies("&with_genres=27"),

        getMovies("&with_genres=10749"),

        getMovies("&with_genres=878"),
      ]);

      setSections([
        {
          title: "🔥 Trending",
          data: trending,
        },
        {
          title: "🎬 Hollywood",
          data: hollywood,
        },
        {
          title: "🇮🇳 Bollywood",
          data: bollywood,
        },
        {
          title: "🎭 Tamil Movies",
          data: tamil,
        },
        {
          title: "🎥 Telugu Movies",
          data: telugu,
        },
        {
          title: "💥 Action",
          data: action,
        },
        {
          title: "😂 Comedy",
          data: comedy,
        },
        {
          title: "👻 Horror",
          data: horror,
        },
        {
          title: "❤️ Romance",
          data: romance,
        },
        {
          title: "🚀 Sci-Fi",
          data: sciFi,
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#111",
      }}
      showsVerticalScrollIndicator={false}
    >
      <Modal visible={menuVisible} transparent animationType="fade">
        <Pressable
          onPress={() => setMenuVisible(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#222",
              width: 180,
              borderRadius: 12,
              padding: 15,
              marginTop: 110,
              marginRight: 20,
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                setMenuVisible(false);

                await signOut(auth);
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="log-out-outline" size={22} color="#E50914" />

              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: "600",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 18,
          marginTop: 55,
          marginBottom: 10,
        }}
      >
        {/* Stylish Title */}
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 30,
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            Movie
          </Text>

          <Text
            style={{
              color: "#E50914",
              fontSize: 24,
              fontWeight: "700",
              marginTop: -5,
            }}
          >
            Recommendation
          </Text>
        </View>

        {/* Right Buttons */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Search Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={{
              backgroundColor: "#222",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Profile Button */}
          <TouchableOpacity
            onPress={() => setMenuVisible(true)}
            style={{
              backgroundColor: "#E50914",
              width: 45,
              height: 45,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="person" size={24} color="#fff" />
          </TouchableOpacity>

          {/* AI Chat Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat")}
            style={{
              backgroundColor: "#6C63FF",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* MOVIE SECTIONS */}
      {sections.map((section) => (
        <View
          key={section.title}
          style={{
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 15,
              marginBottom: 10,
            }}
          >
            {section.title}
          </Text>

          <FlatList
            horizontal
            data={section.data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard movie={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ))}
    </ScrollView>
  );
}
