import type { Mood } from "@/context/LightingContext";
import { useLighting } from "@/context/LightingContext";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ModeToggle from "./ModeToggle";
import WarmthSlider from "./WarmthSlider";

const moods: { key: Mood; color: string; label: string }[] = [
  { key: "warm", color: "#ff9933", label: "Warm" },
  { key: "cool", color: "#3366ff", label: "Cool" },
  { key: "green", color: "#00cc66", label: "Green" },
  { key: "purple", color: "#9933ff", label: "Purple" },
  { key: "pink", color: "#ff69b4", label: "Pink" },
  { key: "yellow", color: "#ffcc00", label: "Yellow" },
];

export default function MoodSelector() {
  const { mode, setMode, setMood } = useLighting();
  const router = useRouter();

  const handleSelect = (mood: Mood) => {
    setMood(mood);
    // Launch animation immediately after mood selection by navigating with param
    router.push({ pathname: "/", params: { autoStart: "true" } });
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-300/40 rounded-2xl p-4 shadow-slate-950 shadow-xl">
      <FlatList
        className="flex-1 pt-4 pb-4"
        contentContainerStyle={{
          padding: 16,
          gap: 12,
          justifyContent: "center",
        }}
        data={moods}
        numColumns={2}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View className="flex-1 m-2">
            <TouchableOpacity
              className="flex-1 h-36 rounded-xl justify-center items-center shadow-md"
              style={{ backgroundColor: item.color }}
              onPress={() => handleSelect(item.key)}
              activeOpacity={0.85}
            >
              <Text className="text-white font-bold text-lg">{item.label}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View className="flex-[0.2] items-center justify-center">
        <ModeToggle />
      </View>
      <View className="flex[0.2] justify-center">
        <WarmthSlider />
      </View>
    </SafeAreaView>
  );
}
