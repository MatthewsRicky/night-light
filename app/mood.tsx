// app/mood.tsx
import React from "react";
import { SafeAreaView } from "react-native";
import MoodSelector from "../components/MoodSelector";

export default function mood() {
  return (
    <SafeAreaView className="flex-1 bg-blue-300/40">
      <MoodSelector />
    </SafeAreaView>
  );
}
