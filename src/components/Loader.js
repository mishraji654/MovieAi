import React from "react";

import {
  View,
  Text,
  ActivityIndicator,
} from "react-native";

export default function Loader() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#111",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        size="large"
        color="#E50914"
      />

      <Text
        style={{
          color: "#fff",
          marginTop: 15,
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        Loading Movies...
      </Text>
    </View>
  );
}