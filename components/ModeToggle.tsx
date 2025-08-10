import { useLighting } from "@/context/LightingContext";
import { getMoodColors } from "@/utils/moodColors";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ModeToggle() {
  const { mode, setMode, mood } = useLighting();
  const [color1, color2] = getMoodColors(mood);

  const renderOption = (label: string, value: "ambient" | "flicker") => {
    const isActive = mode === value;

    if (isActive) {
      return (
        <LinearGradient
          colors={[color1, color2]}
          className="rounded-2xl m-1"
          style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        >
          <Text className="font-bold text-white">{label}</Text>
        </LinearGradient>
      );
    }

    return (
      <TouchableOpacity
        className="m-1 rounded-2xl bg-white/10 border border-white/20"
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backdropFilter: "blur(10px)" as any, // Glass effect
        }}
        activeOpacity={0.85}
        onPress={() => setMode(value)}
      >
        <Text style={{ color: color1 }} className="font-bold">
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-row self-center mt-4 p-1 rounded-3xl bg-white/5 border border-white/10">
      {renderOption("Ambient", "ambient")}
      {renderOption("Flicker", "flicker")}
    </View>
  );
}
