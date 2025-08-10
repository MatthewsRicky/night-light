import FlickerLight from "@/components/FlickerLight";
import ModeToggle from "@/components/ModeToggle";
import WarmthSlider from "@/components/WarmthSlider";
import { useLighting } from "@/context/LightingContext";
import { getContrastingColor } from "@/utils/colorUtils";
import { getMoodColors } from "@/utils/moodColors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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

const { width, height } = Dimensions.get("window");

export default function StartScreen() {
  const navigation = useNavigation();

  const { mood } = useLighting();
  const [started, setStarted] = useState(false);
  const [color1, color2] = getMoodColors(mood);

  // Hide/show tab bar when flicker starts/stops
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: started
        ? { display: "none" } // completely hides tab bar
        : { backgroundColor: "#fff" }, // your default tab style
    });
  }, [started, navigation]);

  // Contrast-aware colors
  const textColor = getContrastingColor(color2);
  const glassBg =
    textColor === "#000000"
      ? "rgba(255,255,255,0.4)"
      : "rgba(255,255,255,0.15)";

  // Breathing animation for Start button
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

  // Fade animation for flicker transition
  const opacity = useSharedValue(0);
  const flickerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const startFlicker = () => {
    setStarted(true);
    opacity.value = withTiming(1, { duration: 500 });
  };

  const stopFlicker = () => {
    opacity.value = withTiming(0, { duration: 500 }, (finished) => {
      if (finished) {
        runOnJS(setStarted)(false);
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
          colors={[color1, color2]}
          style={{ flex: 1, width, height }}
        >
          <Animated.View
            className="flex-1 justify-center items-center"
            style={buttonStyle}
          >
            {/* Glowing background halo */}
            <View
              className="absolute w-48 h-48 rounded-full blur-3xl"
              style={{ backgroundColor: glassBg }}
            />

            {/* Gradient ring */}
            <LinearGradient
              colors={["#ffffffaa", "#ffffff22"]}
              style={{
                padding: 4,
                borderRadius: 9999,
              }}
            >
              {/* Glassy Start Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-36 h-36 rounded-full border justify-center items-center"
                style={{
                  backgroundColor: glassBg,
                  borderColor: textColor + "55", // semi-transparent border based on text color
                }}
                onPress={startFlicker}
              >
                <Ionicons name="play" size={42} color={textColor} />
                <Text
                  style={{ color: textColor }}
                  className="font-bold text-lg mt-1"
                >
                  Start
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>

          {/* Controls at the bottom */}
          <View className="absolute bottom-[25%] w-[90%] self-center items-center space-y-5">
            <ModeToggle />
          </View>

          <WarmthSlider />
        </LinearGradient>
      )}
    </View>
  );
}
