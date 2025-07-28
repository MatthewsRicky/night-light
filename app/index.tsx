import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import FlickerLight from "../components/FlickerLight";
import SettingsScreen from "./settings"; // <- reuse component directly

export default function HomeScreen() {
  const [started, setStarted] = useState(false);
  const [lightColor, setLightColor] = useState("rgb(255, 180, 100)");

  const handleStart = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
    setStarted(true);
  };

  return (
    <View className="flex h-screen bg-black">
      <StatusBar hidden={started} style="light" />

      {/* Show flicker only AFTER start */}
      {started && <FlickerLight baseColor={lightColor} />}

      {!started && (
        <View className="flex items-center justify-center px-6 space-y-8">
          <SettingsScreen onChange={setLightColor} />
          <Pressable
            onPress={handleStart}
            className="bg-white/80 px-6 py-3 rounded-xl self-center"
          >
            <Text className="text-black text-lg font-bold">Start</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
