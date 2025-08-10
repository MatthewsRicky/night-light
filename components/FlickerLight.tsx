import { useLighting } from "@/context/LightingContext";
import React, { useEffect, useState } from "react";
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

export default function FlickerLight() {
  const { warmth, mode, moodColors, flickerSpeed } = useLighting();

  const flicker = useSharedValue(0);
  const warmthShared = useSharedValue(warmth);

  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
    });
    return () => sub?.remove();
  }, []);

  // Sync warmth changes to shared value
  useEffect(() => {
    warmthShared.value = warmth;
  }, [warmth]);

  // Flicker / ambient animation
  useEffect(() => {
    let isMounted = true;
    let animate: () => void;

    if (mode === "flicker") {
      animate = () => {
        if (!isMounted) return;
        const nextValue = Math.random();
        const duration = Math.random() * flickerSpeed + flickerSpeed / 2;
        flicker.value = withTiming(
          nextValue,
          { duration, easing: Easing.bezier(0.42, 0, 0.58, 1) },
          (finished) => {
            if (finished && isMounted) runOnJS(animate)();
          }
        );
      };
      animate();
    } else {
      cancelAnimation(flicker);
      flicker.value = withTiming(1, { duration: 500 });
    }

    return () => {
      isMounted = false;
      cancelAnimation(flicker);
    };
  }, [mode, flickerSpeed]);

  const [coolColor, warmColor] = moodColors;

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
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: flickerColor,
    };
  }, [mode, coolColor, warmColor, dimensions]);

  return <Animated.View style={animatedStyle} />;
}
