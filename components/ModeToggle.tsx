import { useLighting } from "@/context/LightingContext";
import { getContrastingColor } from "@/utils/colorUtils";
import { getMoodColors } from "@/utils/moodColors";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ModeToggle() {
  const { mode, setMode, mood } = useLighting();
  const [color1, color2] = getMoodColors(mood);
  const textColor = getContrastingColor(color1);

  return (
    <View
      className="flex-row self-center mt-4 rounded-2xl border border-white/30"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      {(["ambient", "flicker"] as const).map((m) => (
        <TouchableOpacity
          key={m}
          className={`py-2 px-5 rounded-2xl m-1`}
          style={{
            backgroundColor:
              mode === m ? color2 + "33" /* pastel overlay */ : "transparent",
          }}
          onPress={() => setMode(m)}
          activeOpacity={0.85}
        >
          <Text style={{ color: textColor, fontWeight: "bold" }}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
