// // components/ColorPicker.tsx
// import React from "react";
// import { View, Text } from "react-native";
// import Slider from "@react-native-community/slider";

// interface Props {
//   value: number;
//   onChange: (val: number) => void;
// }

// export default function ColorPicker({ value, onChange }: Props) {
//   return (
//     <View className="w-4/5 items-center space-y-2">
//       <Text className="text-black font-medium">Color Warmth</Text>
//       <Slider
//         style={{ width: "100%", height: 40 }}
//         minimumValue={0}
//         maximumValue={1}
//         value={value}
//         onValueChange={onChange}
//         minimumTrackTintColor="#FF9900"
//         maximumTrackTintColor="#FFD580"
//         thumbTintColor="#FFF"
//       />
//     </View>
//   );
// }
import React from "react";
import { Text, View } from "react-native";

export default function ColorPicker() {
  return (
    <View>
      <Text>ColorPicker</Text>
    </View>
  );
}
