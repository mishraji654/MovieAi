import React, {
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  View,
} from "react-native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../services/firebase";

import BottomTabs from "./BottomTabs";

import ResultScreen from "../screens/ResultScreen";

import MovieDetailScreen from "../screens/MovieDetailScreen";

import SearchScreen from "../screens/SearchScreen";

import LoginScreen from "../screens/LoginScreen";

import SignupScreen from "../screens/SignupScreen";

import ChatScreen from "../screens/ChatScreen"; // 👈 NEW IMPORT

const Stack =
  createNativeStackNavigator();

export default function AppNavigation() {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);

          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent:
            "center",
          alignItems: "center",
          backgroundColor:
            "#000",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#E50914"
        />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000",
        },

        headerTintColor: "#fff",
      }}
    >
      {!user ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={BottomTabs}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{
              headerShown: false,
            }}
          />

          {/* AI Chat Screen */}
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Result"
            component={ResultScreen}
          />

          <Stack.Screen
            name="Detail"
            component={
              MovieDetailScreen
            }
          />
        </>
      )}
    </Stack.Navigator>
  );
}