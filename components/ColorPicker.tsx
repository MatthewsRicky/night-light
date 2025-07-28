import React, { useState } from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

type Props = {
  onChange: (color: string) => void;
};

export default function ColorPicker({ onChange }: Props) {
  const [r, setR] = useState(255);
  const [g, setG] = useState(180);
  const [b, setB] = useState(100);

  const updateColor = (rVal: number, gVal: number, bVal: number) => {
    const newColor = `rgb(${Math.floor(rVal)}, ${Math.floor(gVal)}, ${Math.floor(bVal)})`;
    onChange(newColor);
  };

  return (
    <View className="w-full px-4 space-y-4">
      <Text className="text-white text-sm">Red</Text>
      <Slider
        minimumValue={100}
        maximumValue={255}
        value={r}
        onValueChange={(val) => {
          setR(val);
          updateColor(val, g, b);
        }}
        minimumTrackTintColor="#FF6666"
        thumbTintColor="#fff"
        style={{ height: 40 }}
      />
      <Text className="text-white text-sm">Green</Text>
      <Slider
        minimumValue={80}
        maximumValue={200}
        value={g}
        onValueChange={(val) => {
          setG(val);
          updateColor(r, val, b);
        }}
        minimumTrackTintColor="#FFD580"
        thumbTintColor="#fff"
        style={{ height: 40 }}
      />
      <Text className="text-white text-sm">Blue</Text>
      <Slider
        minimumValue={30}
        maximumValue={150}
        value={b}
        onValueChange={(val) => {
          setB(val);
          updateColor(r, g, val);
        }}
        minimumTrackTintColor="#FFB347"
        thumbTintColor="#fff"
        style={{ height: 40 }}
      />
    </View>
  );
}
