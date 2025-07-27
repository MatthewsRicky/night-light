import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ColorPicker from "../components/ColorPicker";
import FlickerLight from "../components/FlickerLight";

export default function HomeScreen() {
  const [started, setStarted] = useState(false);
  const [lightColor, setLightColor] = useState("rgb(255, 180, 100)");

  const handleStart = async () => {
    //console.log("Start button pressed");

    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      console.log("Orientation locked");
    } catch (error) {
      console.error("Error locking orientation:", error);
    }
    setStarted(true);
    console.log("Started flickering light", true);
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar hidden={started} style="light" />
      <FlickerLight color={lightColor} />

      {!started && (
        <View className="absolute inset-0 justify-center items-center space-y-4">
          <ColorPicker onChange={setLightColor} />
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
