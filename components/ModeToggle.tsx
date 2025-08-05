import { useLighting } from "@/context/LightingContext";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ModeToggle() {
  const { mode, setMode } = useLighting();

  return (
    <View className="flex-row self-center mt-4 bg-zinc-800 rounded-2xl">
      <TouchableOpacity
        className={`py-2 px-5 rounded-2xl m-1 ${mode === "ambient" ? "bg-amber-400" : ""}`}
        onPress={() => setMode("ambient")}
        activeOpacity={0.85}
      >
        <Text className="text-white font-bold">Ambient</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`py-2 px-5 rounded-2xl m-1 ${mode === "flicker" ? "bg-amber-400" : ""}`}
        onPress={() => setMode("flicker")}
        activeOpacity={0.85}
      >
        <Text className="text-white font-bold">Flicker</Text>
      </TouchableOpacity>
    </View>
  );
}
