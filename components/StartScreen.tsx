import FlickerLight from "@/components/FlickerLight";
import ModeToggle from "@/components/ModeToggle";
import { useLighting } from "@/context/LightingContext";
import { useUI } from "@/context/UIContext";
import { getMoodColors } from "@/utils/moodColors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function StartScreen() {
  const { mood } = useLighting();
  const { showTabBar, hideTabBar } = useUI();
  const [started, setStarted] = useState(false);
  const [color1, color2] = getMoodColors(mood);
  const insets = useSafeAreaInsets();

  const handleStopFlicker = () => {
    setStarted(false);
    showTabBar();
  };

  // Animate button breathing
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Flicker fade
  const opacity = useSharedValue(0);
  const flickerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const startFlicker = () => {
    setStarted(true);
    hideTabBar();
    opacity.value = withTiming(1, { duration: 500 });
  };

  const stopFlicker = () => {
    opacity.value = withTiming(0, { duration: 500 }, (finished) => {
      if (finished) runOnJS(handleStopFlicker)();
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {started ? (
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "black",
            paddingBottom: 0, // 👈 override safe area bottom
          }}
          onPress={stopFlicker}
        >
          <Animated.View style={[{ flex: 1 }, flickerStyle]}>
            <FlickerLight />
          </Animated.View>
        </Pressable>
      ) : (
        <LinearGradient
          colors={[`${color1}B3`, `${color1}80`, `${color2}4D`]}
          style={{
            flex: 1,
            width,
            height,
            paddingBottom: insets.bottom, // 👈 safe inset only outside flicker
          }}
        >
          <Animated.View
            style={[
              { flex: 1, justifyContent: "center", alignItems: "center" },
              buttonStyle,
            ]}
          >
            {/* Concentric circles */}
            <Svg height="350" width="350" style={{ position: "absolute" }}>
              <Defs>
                <RadialGradient id="grad" cx="50%" cy="50%" r="50%">
                  <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                  <Stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
                </RadialGradient>
              </Defs>

              <Circle
                cx="175"
                cy="175"
                r="175"
                fill={color2 + "20"}
                stroke="url(#grad)"
                strokeWidth={0.5}
              />
              <Circle
                cx="175"
                cy="175"
                r="155"
                fill={color2 + "20"}
                stroke="url(#grad)"
                strokeWidth={0.4}
              />
              <Circle
                cx="175"
                cy="175"
                r="133"
                fill={color2 + "23"}
                stroke="url(#grad)"
                strokeWidth={0.3}
              />
              <Circle
                cx="175"
                cy="175"
                r="110"
                fill={color2 + "13"}
                stroke="url(#grad)"
                strokeWidth={0.2}
              />
            </Svg>

            {/* Start button */}
            <LinearGradient
              colors={[`${color1}80`, `${color1}80`]}
              style={{ padding: 1, borderRadius: 100 }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  width: 192,
                  height: 192,
                  borderRadius: 96,
                  backgroundColor: "rgba(255,255,255,0.25)",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.4)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={startFlicker}
              >
                <Ionicons name="play" size={60} color="slategray" />
                <Text
                  style={{
                    color: "slategray",
                    fontWeight: "800",
                    fontSize: 20,
                    marginTop: 4,
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>

          {/* Controls (lifted above BottomNav) */}
          <View
            style={{
              position: "absolute",
              bottom: 120,
              width: "100%",
              alignItems: "center",
            }}
          >
            <ModeToggle />
          </View>
        </LinearGradient>
      )}
    </View>
  );
}
