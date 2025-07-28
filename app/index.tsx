import ColorPicker from "@/components/ColorPicker";
import FlickerLight from "@/components/FlickerLight";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

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
    <View className="flex-1 bg-black">
      <StatusBar hidden={started} style="light" />
      <FlickerLight baseColor={lightColor} />

      {!started && (
        <View className="absolute inset-0 justify-center items-center space-y-6 px-6">
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
