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

const COLOR_START = "#ffbb73"; // soft amber
const COLOR_END = "#ff9933"; // deeper warm orange

export default function FlickerLight() {
  const flicker = useSharedValue(0);

  useEffect(() => {
    flicker.value = withRepeat(withTiming(1, { duration: 300 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      flicker.value,
      [0, 1],
      [COLOR_START, COLOR_END]
    );

    return {
      width,
      height,
      backgroundColor,
    };
  });

  return <Animated.View className="flex-1" style={animatedStyle} />;
}
