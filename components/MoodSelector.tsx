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
import { getContrastingColor } from "@/utils/colorUtils";

const moods: { key: Mood; color: string; label: string }[] = [
  { key: "warm", color: "#ff9933", label: "Warm" },
  { key: "cool", color: "#3366ff", label: "Cool" },
  { key: "green", color: "#00cc66", label: "Green" },
  { key: "purple", color: "#9933ff", label: "Purple" },
  { key: "pink", color: "#ff69b4", label: "Pink" },
  { key: "yellow", color: "#ffcc00", label: "Yellow" },
];

export default function MoodSelector() {
  const { setMood } = useLighting();
  const router = useRouter();

  const handleSelect = (mood: Mood) => {
    setMood(mood);
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
        renderItem={({ item }) => {
          const textColor = getContrastingColor(item.color);
          const glassBg =
            textColor === "#000000"
              ? "rgba(255,255,255,0.4)"
              : "rgba(255,255,255,0.15)";

          return (
            <View className="flex-1 m-2">
              <TouchableOpacity
                className="flex-1 h-36 rounded-xl justify-center items-center shadow-md"
                style={{
                  backgroundColor: item.color,
                  borderWidth: 1,
                  borderColor: glassBg,
                }}
                onPress={() => handleSelect(item.key)}
                activeOpacity={0.85}
              >
                <View
                  style={{
                    backgroundColor: glassBg,
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      color: textColor,
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
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
