import type { Mood } from "@/context/LightingContext";
import { useLighting } from "@/context/LightingContext";
import { getContrastingColor } from "@/utils/colorUtils";
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

const moods: { key: Mood; color: string; label: string }[] = [
  { key: "warm", color: "#ff9933", label: "Warm" },
  { key: "cool", color: "#3366ff", label: "Cool" },
  { key: "green", color: "#00cc66", label: "Nature" },
  { key: "purple", color: "#9933ff", label: "Twilight" },
  { key: "pink", color: "#ff69b4", label: "Love" },
  { key: "yellow", color: "#ffcc00", label: "Elation" },
];

export default function MoodSelector() {
  const { setMood } = useLighting();
  const router = useRouter();

  const handleSelect = (mood: Mood) => {
    setMood(mood);
    router.push("/"); // go back to home after selecting
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgba(147,197,253,0.4)", // blue-300/40
        borderRadius: 20,
        padding: 16,
        marginVertical: 8,
      }}
    >
      <FlatList
        contentContainerStyle={{
          paddingVertical: 16,
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
            <View style={{ flex: 1, margin: 8, borderRadius: 12 }}>
              <TouchableOpacity
                style={{
                  height: 140,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
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

      {/* Controls — lifted above nav */}
      <View style={{ alignItems: "center", marginTop: 12, marginBottom: 80 }}>
        <ModeToggle />
      </View>
    </SafeAreaView>
  );
}
