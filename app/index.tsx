import React from "react";
import { SafeAreaView, View } from "react-native";
import StartScreen from "@/components/StartScreen";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <View style={{ flex: 1 }}>
        <StartScreen />
      </View>
    </SafeAreaView>
  );
}
