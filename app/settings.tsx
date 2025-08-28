import { Mood, useLighting } from "@/context/LightingContext";
import { getMoodColors } from "@/utils/moodColors";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const { mode, setMode, flickerSpeed, setFlickerSpeed, mood, setMood } =
    useLighting();

  const [color1, color2] = getMoodColors(mood);

  const router = useRouter();

  const handleSelect = () => {
    router.push("/"); // go back to home after selecting
  };
  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 120, // leave space above BottomNav
        }}
      >
        {/* Card */}
        <View
          className="rounded-2xl border flex-1 p-4"
          style={{
            borderColor: color2,
            backgroundColor: color1,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
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
              <Picker.Item label="Nature" value="nature" />
              <Picker.Item label="Royalty" value="royalty" />
              <Picker.Item label="Love" value="love" />
              <Picker.Item label="Elation" value="elation" />
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
            <TouchableOpacity
              style={{}}
              className="text-white text-center font-semibold"
              onPress={handleSelect}
            >
              <Text className="text-center text-white font-bold">
                Start Fullscreen Flicker
              </Text>
            </TouchableOpacity>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
