// app/index.tsx
import StartScreen from "@/components/StartScreen";
import React from "react";
import { View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1">
      <StartScreen />
    </View>
  );
}
