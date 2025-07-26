import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function ColorPicker({
  onChange,
}: {
  onChange?: (color: string) => void;
}) {
  const [warmth, setWarmth] = useState(30); // 0–100

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("colorWarmth");
      if (stored) setWarmth(Number(stored));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("colorWarmth", warmth.toString());

    const red = 255;
    const green = Math.floor(150 + warmth);
    const blue = Math.floor(100 - warmth);
    const color = `rgb(${red},${green},${blue})`;

    onChange?.(color);
  }, [warmth]);

  return (
    <View className="p-4">
      <Text className="text-white mb-2">Light Warmth: {warmth}</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={warmth}
        onValueChange={setWarmth}
        step={1}
        minimumTrackTintColor="#FFBF70"
        maximumTrackTintColor="#888"
        thumbTintColor="#fff"
      />
    </View>
  );
}
