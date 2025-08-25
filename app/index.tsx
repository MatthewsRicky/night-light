import StartScreen from "@/components/StartScreen";
import React from "react";
import { View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <View style={{ flex: 1 }}>
        <StartScreen />
      </View>
    </View>
  );
}
