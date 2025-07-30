// components/FlickerLight.tsx

import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, {
  cancelAnimation,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useLighting } from "../context/LightingContext";

const { width, height } = Dimensions.get("window");

export default function FlickerLight() {
  const { warmth, mode, flickerSpeed } = useLighting();

  const flicker = useSharedValue(0);

  useEffect(() => {
    if (mode === "flicker") {
      flicker.value = withRepeat(
        withTiming(1, { duration: flickerSpeed }),
        -1,
        true
      );
    } else {
      cancelAnimation(flicker);
      flicker.value = 1; // hold a single color in ambient mode
    }
  }, [mode, flickerSpeed]);

  const animatedStyle = useAnimatedStyle(() => {
    const coolColor = "#ffecc7";
    const warmColor = "#ff9933";
    const baseColor = interpolateColor(warmth, [0, 1], [coolColor, warmColor]);

    const backgroundColor =
      mode === "ambient"
        ? baseColor
        : interpolateColor(flicker.value, [0, 1], [baseColor, "#ffbb73"]);

    return {
      width,
      height,
      backgroundColor,
    };
  });

  return <Animated.View className="flex-1" style={animatedStyle} />;
}
