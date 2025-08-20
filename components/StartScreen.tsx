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

const { width, height } = Dimensions.get("window");

export default function StartScreen() {
  const { mood } = useLighting();
  const { showTabBar, hideTabBar } = useUI();
  const [started, setStarted] = useState(false);
  const [color1, color2] = getMoodColors(mood);

  const handleStopFlicker = () => {
    setStarted(false); // Reset started state
    showTabBar(); // Show the tab bar again
  };

  // Animate the start button breathing
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

  // Flicker fade animation
  const opacity = useSharedValue(0);
  const flickerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const startFlicker = () => {
    setStarted(true);
    hideTabBar(); // hide tabs when flickering starts
    opacity.value = withTiming(1, { duration: 500 });
  };

  const stopFlicker = () => {
    opacity.value = withTiming(0, { duration: 500 }, (finished) => {
      if (finished) {
        runOnJS(handleStopFlicker)();
      }
    });
  };

  return (
    <View className="flex-1">
      {started ? (
        <Pressable className="absolute inset-0" onPress={stopFlicker}>
          <Animated.View className="absolute inset-0" style={flickerStyle}>
            <FlickerLight />
          </Animated.View>
        </Pressable>
      ) : (
        <LinearGradient
          colors={[`${color1}B3`, `${color1}80`, `${color2}4D`]}
          style={{ flex: 1, width, height }}
        >
          <Animated.View
            className="flex-1 justify-center items-center"
            style={buttonStyle}
          >
            {/* Concentric circles */}
            <Svg
              height="350"
              width="350"
              className="absolute items-center justify-center"
            >
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
                strokeWidth={0.4}
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
                fill={color2 + "26"}
                stroke="url(#grad)"
                strokeWidth={0.2}
              />
            </Svg>

            {/* Start Button */}
            <LinearGradient
              colors={[`${color1}80`, `${color1}80`]}
              className="p-1 absolute rounded-full"
              style={{ borderRadius: 100 }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-48 h-48 rounded-full bg-white/25 border border-white/40 justify-center self-center items-center"
                onPress={startFlicker}
              >
                <Ionicons name="play" size={60} color={color2} />
                <Text
                  style={{ color: color2 }}
                  className="font-extrabold text-xl text-center mt-1"
                >
                  Start
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>

          {/* Controls */}
          <View className="absolute bottom-[15%] w-[90%] self-center items-center space-y-5">
            <ModeToggle />
          </View>
        </LinearGradient>
      )}
    </View>
  );
}
