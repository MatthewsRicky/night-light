import MoodSelector from "@/components/MoodSelector";
import React from "react";
import { SafeAreaView, View } from "react-native";

export default function MoodScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <MoodSelector />
      </View>
    </SafeAreaView>
  );
}
