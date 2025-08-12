import { Mood, useLighting } from "@/context/LightingContext";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function SettingsScreen() {
  const {
    mode,
    setMode,
    flickerSpeed,
    setFlickerSpeed,
    mood,
    setMood,
    warmth,
    setWarmth,
  } = useLighting();

  const navigation = useNavigation();

  // Hide header and tab bar when in flicker mode
  useEffect(() => {
    navigation.setOptions({
      headerShown: mode !== "flicker",
      tabBarStyle: { display: mode === "flicker" ? "none" : "flex" },
    });
  }, [mode]);

  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <Text className="text-lg font-semibold mb-2">Lighting Mode</Text>
      <Picker
        selectedValue={mode}
        onValueChange={(value: "flicker" | "ambient") => setMode(value)}
      >
        <Picker.Item label="Flicker" value="flicker" />
        <Picker.Item label="Ambient" value="ambient" />
      </Picker>

      <Text className="text-lg font-semibold mt-4 mb-2">Mood</Text>
      <Picker
        selectedValue={mood}
        onValueChange={(value: Mood) => setMood(value)}
      >
        <Picker.Item label="Warm" value="warm" />
        <Picker.Item label="Cool" value="cool" />
        <Picker.Item label="Green" value="green" />
        <Picker.Item label="Purple" value="purple" />
        <Picker.Item label="Pink" value="pink" />
        <Picker.Item label="Yellow" value="yellow" />
      </Picker>

      <Text className="text-lg font-semibold mt-4 mb-2">Flicker Speed</Text>
      <Slider
        minimumValue={100}
        maximumValue={1000}
        step={50}
        value={flickerSpeed}
        onValueChange={(value: number) => setFlickerSpeed(value)}
      />
      <Text>{flickerSpeed} ms</Text>

      <Text className="text-lg font-semibold mt-4 mb-2">Warmth</Text>
      <Slider
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        value={warmth}
        onValueChange={(value: number) => setWarmth(value)}
      />
      <Text>{Math.round(warmth * 100)}%</Text>

      <Pressable
        onPress={() => setMode("flicker")}
        className="mt-6 bg-amber-400 px-4 py-2 rounded-lg"
      >
        <Text className="text-white text-center font-semibold">
          Start Fullscreen Flicker
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
