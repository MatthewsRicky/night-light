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

import { useLighting } from "@/context/LightingContext";
import { getMoodColors } from "@/utils/moodColors";

const { width, height } = Dimensions.get("window");

export default function FlickerLight() {
  const { warmth, mode, flickerSpeed, mood } = useLighting();

  const flicker = useSharedValue(0);
  const [coolColor, warmColor] = getMoodColors(mood ?? "warm");

  useEffect(() => {
    if (mode === "flicker") {
      flicker.value = withRepeat(
        withTiming(1, { duration: flickerSpeed }),
        -1,
        true
      );
    } else {
      cancelAnimation(flicker);
      flicker.value = 1;
    }
  }, [mode, flickerSpeed]);

  const animatedStyle = useAnimatedStyle(() => {
    const baseColor = interpolateColor(warmth, [0, 1], [coolColor, warmColor]);

    const flickerColor =
      mode === "ambient"
        ? baseColor
        : interpolateColor(flicker.value, [0, 1], [coolColor, warmColor]);

    return {
      width,
      height,
      backgroundColor: flickerColor,
    };
  });

  return <Animated.View style={animatedStyle} />;
}
