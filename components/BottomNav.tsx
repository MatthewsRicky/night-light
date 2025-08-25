import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { useUI } from "@/context/UIContext";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { tabBarVisible } = useUI();

  if (!tabBarVisible) return null; // hide automatically when requested

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Ionicons
          name="sunny-outline"
          size={28}
          color={pathname === "/" ? "gold" : "silver"}
        />
        <Text style={styles.label}>Light</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/mood")}>
        <Ionicons
          name="color-palette-outline"
          size={28}
          color={pathname === "/mood" ? "gold" : "silver"}
        />
        <Text style={styles.label}>Mood</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/settings")}>
        <Ionicons
          name="settings-outline"
          size={28}
          color={pathname === "/settings" ? "gold" : "silver"}
        />
        <Text style={styles.label}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFD70033",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    paddingBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "silver",
    textAlign: "center",
  },
});
