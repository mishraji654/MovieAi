import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  provider,
} from "../services/firebase";

export default function SignupScreen({
  navigation,
}) {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // EMAIL SIGNUP
  const handleSignup =
    async () => {
      if (
        !name ||
        !email ||
        !password
      ) {
        Alert.alert(
          "Error",
          "Please fill all fields"
        );

        return;
      }

      try {
        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        // SAVE NAME
        await updateProfile(
          userCredential.user,
          {
            displayName: name,
          }
        );

        Alert.alert(
          "Success",
          "Account Created"
        );

        navigation.replace(
          "Main"
        );
      } catch (error) {
        Alert.alert(
          "Signup Error",
          error.message
        );
      }
    };

  // GOOGLE SIGNUP
  const handleGoogleSignup =
    async () => {
      try {
        await signInWithPopup(
          auth,
          provider
        );

        Alert.alert(
          "Success",
          "Google Signup Successful"
        );

        navigation.replace(
          "Main"
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
      {/* TITLE */}
      <Text
        style={{
          color: "#E50914",
          fontSize: 35,
          fontWeight: "bold",
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Create Account
      </Text>

      {/* NAME */}
      <TextInput
        placeholder="Full Name"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: "#222",
          color: "#fff",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      {/* EMAIL */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          backgroundColor: "#222",
          color: "#fff",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      {/* PASSWORD */}
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

      {/* SIGNUP BUTTON */}
      <TouchableOpacity
        onPress={handleSignup}
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
            fontSize: 16,
          }}
        >
          Signup
        </Text>
      </TouchableOpacity>

      {/* GOOGLE SIGNUP */}
      <TouchableOpacity
        onPress={
          handleGoogleSignup
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
            fontSize: 16,
          }}
        >
          Continue with Google
        </Text>
      </TouchableOpacity>

      {/* LOGIN */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Login"
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
          Already have an account?
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}