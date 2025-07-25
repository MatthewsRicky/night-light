import { Text, View } from "react-native";
import TimerControl from "@/components/TimerControl";

export default function TimerScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-black p-4">
      <Text className="text-xl font-semibold mb-4 text-black dark:text-white">
        Auto-Off Timer
      </Text>
      <TimerControl />
    </View>
  );
}
