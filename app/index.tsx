// app/index.tsx
import FlickerLight from "@/components/FlickerLight";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";

import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const [started, setStarted] = useState(false);

  const handleStart = async () => {
    try {
      // Lock orientation to portrait
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setStarted(true);
    } catch (e) {
      console.warn("Failed to enter full screen:", e);
    }
  };

  return (
    <View className="flex-1">
      <FlickerLight />

      {/* Status bar hidden only after start */}
      <StatusBar hidden={started} style="light" />

      {!started && (
        <View className="absolute inset-0 justify-center items-center">
          <Pressable
            onPress={handleStart}
            className="bg-white/80 px-6 py-3 rounded-xl"
          >
            <Text className="text-black text-lg font-bold">Start</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
