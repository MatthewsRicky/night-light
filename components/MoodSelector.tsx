import type { Mood } from "@/context/LightingContext";
import { useLighting } from "@/context/LightingContext";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

const moods: { key: Mood; color: string; label: string }[] = [
  { key: "warm", color: "#ff9933", label: "Warm" },
  { key: "cool", color: "#3366ff", label: "Cool" },
  { key: "green", color: "#00cc66", label: "Green" },
  { key: "purple", color: "#9933ff", label: "Purple" },
  { key: "pink", color: "#ff69b4", label: "Pink" },
  { key: "yellow", color: "#ffcc00", label: "Yellow" },
];

export default function MoodSelector() {
  const { setMode, setMood } = useLighting();
  const router = useRouter();

  const handleSelect = (mood: Mood) => {
    setMood(mood);
    setMode("flicker");
    router.push("/flicker");
  };

  return (
    <FlatList
      contentContainerStyle={styles.grid}
      data={moods}
      numColumns={2}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.card, { backgroundColor: item.color }]}
          onPress={() => handleSelect(item.key)}
        >
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create<{
  grid: ViewStyle;
  card: ViewStyle;
  label: TextStyle;
}>({
  grid: {
    padding: 16,
    gap: 12,
    justifyContent: "center",
  },
  card: {
    flex: 1,
    height: 120,
    margin: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  label: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
