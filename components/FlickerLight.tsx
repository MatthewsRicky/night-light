// components/FlickerLight.tsx
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

interface Props {
  warmth: number; // 0 to 1
}

export default function FlickerLight({ warmth }: Props) {
  const flicker = useSharedValue(0);

  useEffect(() => {
    flicker.value = withRepeat(withTiming(1, { duration: 300 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    // Interpolate colors based on warmth
    const cool = "#ffecc7";
    const warm = "#ff9933";
    const baseColor = interpolateColor(warmth, [0, 1], [cool, warm]);

    const flickerColor = interpolateColor(
      flicker.value,
      [0, 1],
      [baseColor, "#ffbb73"]
    );

    return {
      width,
      height,
      backgroundColor: flickerColor,
    };
  });

  return <Animated.View className="flex-1" style={animatedStyle} />;
}
