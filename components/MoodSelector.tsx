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
import { getMoodColors } from "@/utils/moodColors";

export const moods: { key: Mood; color: string; label: string }[] = [
  // Alkali metals
  { key: "lithium", color: "#FF2B2B", label: "Lithium" }, // crimson red
  { key: "sodium", color: "#FFD466", label: "Sodium" }, // intense yellow-orange
  { key: "potassium", color: "#B76EFF", label: "Potassium" }, // lilac/violet
  { key: "rubidium", color: "#9E4A9E", label: "Rubidium" }, // deep red-violet
  { key: "cesium", color: "#5A8AFF", label: "Cesium" }, // sky blue

  // Alkaline earth metals
  { key: "calcium", color: "#FF6F3C", label: "Calcium" }, // orange-red
  { key: "strontium", color: "#FF3E3E", label: "Strontium" }, // scarlet red
  { key: "barium", color: "#A7FF62", label: "Barium" }, // yellow-green
  { key: "copper", color: "#00FFB3", label: "Copper" }, // blue-green (CuCl₂)
  { key: "boron", color: "#50E0FF", label: "Boron" }, // bright blue (borax)

  // Transition metals / rarer salts
  { key: "iron", color: "#E1A95F", label: "Iron" }, // gold/amber sparks
  { key: "manganese", color: "#FF80FF", label: "Manganese" }, // light pink/lavender
  { key: "lead", color: "#8D8DFF", label: "Lead" }, // pale blue
  { key: "antimony", color: "#89CFF0", label: "Antimony" }, // whitish blue
  { key: "arsenic", color: "#99FF99", label: "Arsenic" }, // pale green

  // Exotic colors
  { key: "phosphorus", color: "#FFD1AA", label: "Phosphorus" }, // soft peach
  { key: "selenium", color: "#FF9999", label: "Selenium" }, // reddish glow
  { key: "thallium", color: "#00CC77", label: "Thallium" }, // emerald green
  { key: "indium", color: "#4B9CD3", label: "Indium" }, // blue-indigo
  { key: "tungsten", color: "#D4AF37", label: "Tungsten" }, // golden-white
];

export default function MoodSelector() {
  const { setMood } = useLighting();
  const router = useRouter();
    const { mood } = useLighting();
    const [color1, color2] = getMoodColors(mood);
    const textColor = getContrastingColor(color1);

  const handleSelect = (mood: Mood) => {
    setMood(mood);
    router.push("/"); // go back to home after selecting
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color1, // blue-300/40
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
      <View style={{ alignItems: "center", marginTop: 12, marginBottom: 40 }}>
        <ModeToggle />
      </View>
    </SafeAreaView>
  );
}
