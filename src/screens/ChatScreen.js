import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { askAI } from "../services/ai";

import { searchMovieByName } from "../services/api";

export default function ChatScreen({ navigation }) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const currentMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");

    try {
      setLoading(true);

      const result = await askAI(currentMessage);

      console.log("AI RESULT =>", result);

      if (!result) {
        throw new Error("AI response not found");
      }

      // DIRECT MOVIE SEARCH
      if (result.type === "movie") {
        const movie = await searchMovieByName(result.title);

        if (movie) {
          navigation.navigate("Detail", { movie });
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "ai",
              text: `Movie "${result.title}" not found.`,
            },
          ]);
        }

        return;
      }

      // GENRE MOVIES
      if (result.type === "genre") {
        navigation.navigate("Result", {
          mood: result.genre,
        });

        return;
      }

      // SIMILAR MOVIES
      if (result.type === "similar") {
        const movieResults = await Promise.all(
          result.movies.map((movieName) => searchMovieByName(movieName)),
        );

        const filteredMovies = movieResults.filter(Boolean);

        console.log("FINAL MOVIES =>", filteredMovies);

        if (filteredMovies.length > 0) {
          navigation.navigate("Result", {
            aiMovies: filteredMovies,
            title: "AI Recommendations",
          });
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "ai",
              text: "No matching movies found on TMDB.",
            },
          ]);
        }

        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "No recommendations found.",
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#111",
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 60,
          paddingHorizontal: 20,
          paddingBottom: 15,
          borderBottomWidth: 1,
          borderBottomColor: "#222",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginRight: 15,
          }}
        >
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <View
          style={{
            width: 45,
            height: 45,
            borderRadius: 25,
            backgroundColor: "#E50914",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            AI
          </Text>
        </View>

        <View
          style={{
            marginLeft: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Movie Assistant
          </Text>

          <Text
            style={{
              color: "#0f0",
              fontSize: 12,
            }}
          >
            ● Online
          </Text>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          padding: 15,
        }}
      >
        {messages.length === 0 ? (
          <View
            style={{
              marginTop: 50,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#888",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Ask me for movie recommendations 🎬
            </Text>
          </View>
        ) : (
          messages.map((item) => (
            <View
              key={item.id}
              style={{
                alignSelf: item.sender === "user" ? "flex-end" : "flex-start",

                backgroundColor: item.sender === "user" ? "#E50914" : "#222",

                padding: 12,
                borderRadius: 15,
                marginBottom: 10,
                maxWidth: "85%",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  lineHeight: 22,
                }}
              >
                {item.text}
              </Text>
            </View>
          ))
        )}

        {loading && (
          <View
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#222",
              padding: 12,
              borderRadius: 15,
            }}
          >
            <ActivityIndicator color="#fff" />
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          borderTopWidth: 1,
          borderTopColor: "#222",
        }}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Ask anything about movies..."
          placeholderTextColor="#777"
          style={{
            flex: 1,
            backgroundColor: "#222",
            color: "#fff",
            borderRadius: 25,
            paddingHorizontal: 18,
            paddingVertical: 12,
            marginRight: 10,
          }}
        />

        <TouchableOpacity
          onPress={handleSend}
          disabled={loading}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#E50914",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Ionicons name="send" size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
