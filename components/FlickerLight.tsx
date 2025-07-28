import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

type Props = {
  baseColor: string;
};

function generateFlickerColor(baseColor: string): string {
  const [r, g, b] = baseColor
    .replace(/[^\d,]/g, "")
    .split(",")
    .map(Number);

  const jitter = (val: number, range = 20) =>
    Math.max(
      0,
      Math.min(255, val + Math.floor(Math.random() * range - range / 2))
    );

  return `rgb(${jitter(r, 8)}, ${jitter(g, 10)}, ${jitter(b, 12)})`;
}

export default function FlickerLight({ baseColor }: Props) {
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const [color, setColor] = useState(baseColor);

  useEffect(() => {
    let isMounted = true;

    const flickerLoop = () => {
      if (!isMounted) return;

      const newColor = generateFlickerColor(baseColor);
      setColor(newColor);

      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.95 + Math.random() * 0.05,
          duration: 80 + Math.random() * 40,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        requestAnimationFrame(flickerLoop);
      });
    };

    flickerLoop();

    return () => {
      isMounted = false;
      opacityAnim.stopAnimation();
    };
  }, [baseColor]);

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: baseColor,
          opacity: opacityAnim,
        },
      ]}
    />
  );
}
