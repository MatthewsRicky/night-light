// App.tsx
import { useKeepAwake } from "expo-keep-awake";
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Home from "./home";

export default function App() {
  useKeepAwake();

  return (
    <SafeAreaView>
      <StatusBar hidden />
      <Home />
    </SafeAreaView>
  );
}
