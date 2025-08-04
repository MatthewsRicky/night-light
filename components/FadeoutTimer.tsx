import { useLighting } from "@/context/LightingContext";
import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function FadeOutTimer() {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { setWarmth } = useLighting();
  const fadeValue = useSharedValue(1); // starts fully on

  const startTimer = (minutes: number) => {
    setRemainingTime(minutes * 60);
    setIsRunning(true);
    fadeValue.value = withTiming(0, { duration: minutes * 60 * 1000 });
  };

  const stopTimer = () => {
    setIsRunning(false);
    setRemainingTime(0);
    fadeValue.value = withTiming(1, { duration: 500 });
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            stopTimer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const overlayStyle = useAnimatedStyle(() => {
    return {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "black",
      opacity: 1 - fadeValue.value,
    };
  });

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <>
      <Animated.View pointerEvents="none" style={overlayStyle} />
      <View style={styles.container}>
        <Text style={styles.label}>
          Fade-Out Timer: {minutes}:{seconds.toString().padStart(2, "0")}
        </Text>
        <View style={styles.buttons}>
          <Button title="10 Min" onPress={() => startTimer(10)} />
          <Button title="30 Min" onPress={() => startTimer(30)} />
          <Button title="Cancel" onPress={stopTimer} color="red" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    alignItems: "center",
  },
  label: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
});
