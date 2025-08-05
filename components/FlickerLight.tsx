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
  const { warmth, mode, mood } = useLighting();

  const flicker = useSharedValue(0);
  const warmthShared = useSharedValue(warmth);

  const [coolColor, warmColor] = useMemo(
    () => getMoodColors(mood ?? "warm"),
    [mood]
  );

  // Sync warmth to shared value
  useEffect(() => {
    warmthShared.value = warmth;
  }, [warmth]);

  // Animate flicker
  useEffect(() => {
    let isMounted = true;
    let animate: () => void;

    if (mode === "flicker") {
      animate = () => {
        if (!isMounted) return;
        const nextValue = Math.random();
        const duration = Math.random() * 200 + 100;
        flicker.value = withTiming(
          nextValue,
          {
            duration,
            easing: Easing.bezier(0.42, 0, 0.58, 1),
          },
          (finished) => {
            if (finished && isMounted) runOnJS(animate)();
          }
        );
      };
      animate();
    } else {
      cancelAnimation(flicker);
      flicker.value = withTiming(1);
    }

    return () => {
      isMounted = false;
      cancelAnimation(flicker);
    };
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
  }, [mode, coolColor, warmColor]);

  return <Animated.View style={animatedStyle} />;
}
