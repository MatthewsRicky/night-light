import { useLighting } from "@/context/LightingContext";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

const moods = [
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

  const handleSelect = (moodKey: string) => {
    setMood(moodKey as any);
    setMode("flicker");
    router.push("/flicker" as const);
  };

  return (
    <FlatList
      contentContainerStyle={styles.grid}
      data={moods}
      numColumns={2}
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

const styles = StyleSheet.create({
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
