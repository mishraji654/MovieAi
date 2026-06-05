import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigation from "./src/navigation/AppNavigation";

import AppProvider from "./src/context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AppProvider>
  );
}