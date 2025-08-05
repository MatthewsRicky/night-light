import FadeOutTimer from "@/components/FadeoutTimer";
import ModeToggle from "@/components/ModeToggle";
import WarmthSlider from "@/components/WarmthSlider";
import { Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-black p-4">
      <Text className="text-xl font-semibold mb-4 text-black dark:text-white">
        Settings
      </Text>

      <View className="mb-8">
        <Text className="text-lg font-semibold mb-2 text-black dark:text-white">
          Warmth
        </Text>
        <WarmthSlider />
      </View>

      <View className="mb-8">
        <Text className="text-lg font-semibold mb-2 text-black dark:text-white">
          Auto-Off Timer
        </Text>
        <FadeOutTimer />
      </View>

      <View className="mb-8">
        <Text className="text-lg font-semibold mb-2 text-black dark:text-white">
          Mode
        </Text>
        <ModeToggle />
      </View>
    </View>
  );
}
