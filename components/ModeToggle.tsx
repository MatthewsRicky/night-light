import { useLighting } from "@/context/LightingContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ModeToggle() {
  const { mode, setMode } = useLighting();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, mode === "ambient" && styles.active]}
        onPress={() => setMode("ambient")}
      >
        <Text style={styles.text}>Ambient</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, mode === "flicker" && styles.active]}
        onPress={() => setMode("flicker")}
      >
        <Text style={styles.text}>Flicker</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 16,
    backgroundColor: "#333",
    borderRadius: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 4,
  },
  active: {
    backgroundColor: "#ff9933",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
