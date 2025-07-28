import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Text, View } from "react-native";

type Props = {
  onChange?: (color: string) => void;
};

export default function SettingsScreen({ onChange }: Props) {
  const [r, setR] = useState(255);
  const [g, setG] = useState(180);
  const [b, setB] = useState(100);

  const emitColor = (rVal: number, gVal: number, bVal: number) => {
    const color = `rgb(${Math.floor(rVal)}, ${Math.floor(gVal)}, ${Math.floor(bVal)})`;
    onChange?.(color);
  };

  return (
    <View className="flex-1 bg-black px-6 pt-12 space-y-6">
      <Text className="text-white text-lg font-bold mb-2">
        Adjust Light Color
      </Text>

      <View>
        <Text className="text-white mb-1">Red</Text>
        <Slider
          minimumValue={100}
          maximumValue={255}
          value={r}
          onValueChange={(val) => {
            setR(val);
            emitColor(val, g, b);
          }}
          minimumTrackTintColor="#ff6666"
          thumbTintColor="#fff"
        />
      </View>

      <View>
        <Text className="text-white mb-1">Green</Text>
        <Slider
          minimumValue={80}
          maximumValue={200}
          value={g}
          onValueChange={(val) => {
            setG(val);
            emitColor(r, val, b);
          }}
          minimumTrackTintColor="#ffd580"
          thumbTintColor="#fff"
        />
      </View>

      <View>
        <Text className="text-white mb-1">Blue</Text>
        <Slider
          minimumValue={30}
          maximumValue={150}
          value={b}
          onValueChange={(val) => {
            setB(val);
            emitColor(r, g, val);
          }}
          minimumTrackTintColor="#ffa500"
          thumbTintColor="#fff"
        />
      </View>
    </View>
  );
}
