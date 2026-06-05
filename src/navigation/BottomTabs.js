import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";

import CameraScreen from "../screens/CameraScreen";

import FavoritesScreen from "../screens/FavoritesScreen";

import DownloadScreen from "../screens/DownloadScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#000",
          height: 65,
          paddingBottom: 8,
        },

        tabBarActiveTintColor: "red",

        tabBarInactiveTintColor: "gray",

        headerShown: false,

        // ICONS
        tabBarIcon: ({
          color,
          size,
        }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;

            case "Camera":
              iconName = "camera";
              break;

            case "Favorites":
              iconName = "heart";
              break;

            case "Downloads":
              iconName = "download";
              break;

            default:
              iconName = "ellipse";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Camera"
        component={CameraScreen}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
      />

      <Tab.Screen
        name="Downloads"
        component={DownloadScreen}
      />
    </Tab.Navigator>
  );
}