import React, {
  useContext,
} from "react";

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  IMAGE_URL,
} from "../config/apiconfig";

import {
  AppContext,
} from "../context/AppContext";

export default function DownloadScreen({
  navigation,
}) {
  const { downloads } =
    useContext(AppContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#111",
        paddingTop: 50,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent:
            "space-between",
          alignItems: "center",
          paddingHorizontal: 18,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          Downloads
        </Text>

        <Ionicons
          name="download"
          size={28}
          color="#E50914"
        />
      </View>

      {/* Empty State */}
      {downloads?.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent:
              "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="cloud-download-outline"
            size={90}
            color="gray"
          />

          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 15,
            }}
          >
            No Downloads Yet
          </Text>

          <Text
            style={{
              color: "gray",
              marginTop: 8,
              textAlign: "center",
              paddingHorizontal: 40,
            }}
          >
            Download movies and watch
            them offline anytime
          </Text>
        </View>
      ) : (
        <FlatList
          data={downloads}
          keyExtractor={(item) =>
            item.id.toString()
          }
          contentContainerStyle={{
            padding: 15,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  "Detail",
                  {
                    movie: item,
                  }
                )
              }
              style={{
                flexDirection: "row",
                marginBottom: 18,
                backgroundColor:
                  "#1a1a1a",
                borderRadius: 15,
                overflow: "hidden",
              }}
            >
              {/* Poster */}
              <Image
                source={{
                  uri:
                    IMAGE_URL +
                    item.poster_path,
                }}
                style={{
                  width: 110,
                  height: 150,
                }}
              />

              {/* Info */}
              <View
                style={{
                  flex: 1,
                  padding: 12,
                  justifyContent:
                    "center",
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Text>

                <Text
                  style={{
                    color: "gray",
                    marginTop: 8,
                  }}
                >
                  ⭐{" "}
                  {item.vote_average?.toFixed(
                    1
                  )}
                </Text>

                <View
                  style={{
                    flexDirection:
                      "row",
                    alignItems:
                      "center",
                    marginTop: 12,
                  }}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color="#E50914"
                  />

                  <Text
                    style={{
                      color:
                        "#E50914",
                      marginLeft: 5,
                      fontWeight:
                        "bold",
                    }}
                  >
                    Downloaded
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}