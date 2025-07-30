// app/settings.tsx
import Slider from "@react-native-community/slider";
import { Switch, Text, View } from "react-native";
import { useLighting } from "../context/LightingContext";

export default function SettingsScreen() {
  const { warmth, setWarmth, mode, setMode, flickerSpeed, setFlickerSpeed } =
    useLighting();

  return (
    <View className="flex-1 bg-black px-6 py-10 space-y-6">
      <Text className="text-white text-xl font-bold">Settings</Text>

      {/* Warmth Slider */}
      <View>
        <Text className="text-white mb-1">Color Warmth</Text>
        <Slider
          minimumValue={0}
          maximumValue={1}
          value={warmth}
          onValueChange={setWarmth}
          minimumTrackTintColor="#FFA500"
          maximumTrackTintColor="#ccc"
        />
      </View>

      {/* Flicker Speed Slider */}
      {mode === "flicker" && (
        <View>
          <Text className="text-white mb-1">
            Flicker Speed ({flickerSpeed}ms)
          </Text>
          <Slider
            minimumValue={100}
            maximumValue={1000}
            step={50}
            value={flickerSpeed}
            onValueChange={setFlickerSpeed}
            minimumTrackTintColor="#FFA500"
            maximumTrackTintColor="#ccc"
          />
        </View>
      )}

      {/* Mode Switch */}
      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-white">Ambient Mode</Text>
        <Switch
          value={mode === "ambient"}
          onValueChange={(val) => setMode(val ? "ambient" : "flicker")}
        />
      </View>
    </View>
  );
}
