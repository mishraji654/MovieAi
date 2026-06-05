import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  provider,
} from "../services/firebase";

export default function LoginScreen({
  navigation,
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // EMAIL LOGIN
  const handleLogin =
    async () => {
      try {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        Alert.alert(
          "Success",
          "Login Successful"
        );
      } catch (error) {
        Alert.alert(
          "Error",
          error.message
        );
      }
    };

  // GOOGLE LOGIN
  const handleGoogleLogin =
    async () => {
      try {
        await signInWithPopup(
          auth,
          provider
        );

        Alert.alert(
          "Success",
          "Google Login Successful"
        );
      } catch (error) {
        Alert.alert(
          "Error",
          error.message
        );
      }
    };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent:
          "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "#E50914",
          fontSize: 35,
          fontWeight: "bold",
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Movie AI
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: "#222",
          color: "#fff",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: "#222",
          color: "#fff",
          padding: 15,
          borderRadius: 10,
        }}
      />

      {/* LOGIN */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#E50914",
          padding: 15,
          borderRadius: 10,
          marginTop: 25,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>

      {/* GOOGLE */}
      <TouchableOpacity
        onPress={
          handleGoogleLogin
        }
        style={{
          backgroundColor: "#fff",
          padding: 15,
          borderRadius: 10,
          marginTop: 15,
        }}
      >
        <Text
          style={{
            color: "#000",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Continue with Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Signup"
          )
        }
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Don't have an account?
          Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
}