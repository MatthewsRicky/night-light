import { useLighting } from "@/context/LightingContext";
import { getMoodColors } from "@/utils/moodColors";
import React, { useEffect, useMemo } from "react";
import { Dimensions } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function FlickerLight() {
  const { warmth, mode, flickerSpeed, mood } = useLighting();

  const flicker = useSharedValue(0);
  const warmthShared = useSharedValue(warmth);

  const [coolColor, warmColor] = useMemo(() => getMoodColors(mood ?? "warm"), [mood]);

  // Update shared warmth value when context warmth changes
  useEffect(() => {
    warmthShared.value = warmth;
  }, [warmth]);

  // Animate flicker
  useEffect(() => {
    if (mode === "flicker") {
      const animate = () => {
        const nextValue = Math.random(); // target flicker intensity
        const duration = Math.random() * 200 + 100; // 100–300ms

        flicker.value = withTiming(
          nextValue,
          {
            duration,
            easing: Easing.bezier(0.42, 0, 0.58, 1), // smooth ease
          },
          (finished) => {
            if (finished) runOnJS(animate)(); // loop
          }
        );
      };
      animate();
    } else {
      cancelAnimation(flicker);
      flicker.value = withTiming(1);
    }
  }, [mode]);

  const animatedStyle = useAnimatedStyle(() => {
    const baseColor = interpolateColor(
      warmthShared.value,
      [0, 1],
      [coolColor, warmColor]
    );

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
