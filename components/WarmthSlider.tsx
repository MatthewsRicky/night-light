import { useLighting } from "@/context/LightingContext";
import Slider from "@react-native-community/slider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function WarmthSlider() {
  const { warmth, setWarmth } = useLighting();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Warmth</Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        minimumTrackTintColor="#ff9933"
        maximumTrackTintColor="#3366ff"
        thumbTintColor="#ffffff"
        value={warmth}
        onValueChange={setWarmth}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 12,
    margin: 16,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
});
