import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

interface FlickerLightProps {
  color?: string; // Dynamic color from warmth slider
}

export default function FlickerLight({
  color = "rgb(255, 180, 100)",
}: FlickerLightProps) {
  const flickerAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(flickerAnim, {
          toValue: 0.8,
          duration: 80,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(flickerAnim, {
          toValue: 1,
          duration: 120,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(flickerAnim, {
          toValue: 0.85,
          duration: 90,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(flickerAnim, {
          toValue: 1,
          duration: 100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();

    return () => loop.stop();
  }, []);

  return (
    <Animated.View
      className="absolute inset-0"
      style={{
        backgroundColor: color,
        opacity: flickerAnim,
      }}
    />
    
  );
}
