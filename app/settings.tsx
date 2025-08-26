import React from "react";
import { SafeAreaView, ScrollView, Text, View, Pressable } from "react-native";
import { Mood, useLighting } from "@/context/LightingContext";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";

export default function SettingsScreen() {
  const { mode, setMode, flickerSpeed, setFlickerSpeed, mood, setMood } =
    useLighting();

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "stretch",
          height: "auto",

          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 120, // leave space above BottomNav
        }}
      >
        {/* Card */}
        <View
          className="rounded-2xl border justify-center items-center p-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.85)",
            borderColor: "rgba(0,0,0,0.06)",
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 2,
            padding: 16,
            marginVertical: 16,
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
          }}
        >
          <Text className="text-lg font-semibold mb-2">Lighting Mode</Text>
          <View
            className="rounded-xl border mb-4"
            style={{ borderColor: "rgba(0,0,0,0.08)", overflow: "hidden" }}
          >
            <Picker
              selectedValue={mode}
              onValueChange={(value: "flicker" | "ambient") => setMode(value)}
            >
              <Picker.Item label="Flicker" value="flicker" />
              <Picker.Item label="Ambient" value="ambient" />
            </Picker>
          </View>

          <Text className="text-lg font-semibold mb-2">Mood</Text>
          <View
            className="rounded-xl border mb-4"
            style={{ borderColor: "rgba(0,0,0,0.08)", overflow: "hidden" }}
          >
            <Picker
              selectedValue={mood}
              onValueChange={(value: Mood) => setMood(value)}
            >
              <Picker.Item label="Warm" value="warm" />
              <Picker.Item label="Cool" value="cool" />
              <Picker.Item label="Green" value="green" />
              <Picker.Item label="Purple" value="purple" />
              <Picker.Item label="Pink" value="pink" />
              <Picker.Item label="Yellow" value="yellow" />
            </Picker>
          </View>

          <Text className="text-lg font-semibold mb-2">Flicker Speed</Text>
          <View className="px-1">
            <Slider
              minimumValue={100}
              maximumValue={1000}
              step={50}
              value={flickerSpeed}
              onValueChange={(value: number) => setFlickerSpeed(value)}
              minimumTrackTintColor="#f59e0b"
              maximumTrackTintColor="rgba(0,0,0,0.15)"
              thumbTintColor="#f59e0b"
            />
            <Text className="mt-1 text-base">{flickerSpeed} ms</Text>
          </View>

          <Pressable
            onPress={() => setMode("flicker")}
            className="mt-6 rounded-xl px-4 py-3"
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.9)", // amber-500 ~
              shadowColor: "#f59e0b",
              shadowOpacity: 0.3,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
              elevation: 2,
            }}
          >
            <Text className="text-white text-center font-semibold">
              Start Fullscreen Flicker
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
