import { Text, View } from "react-native";
import ColorPicker from "@/components/ColorPicker";

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-black p-4">
      <Text className="text-xl font-semibold mb-4 text-black dark:text-white">
        Customize Light
      </Text>
      <ColorPicker />
    </View>
  );
}
