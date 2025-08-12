import FlickerLight from "@/components/FlickerLight";
import ModeToggle from "@/components/ModeToggle";
import { useLighting } from "@/context/LightingContext";
import { getMoodColors } from "@/utils/moodColors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
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
  const { mood } = useLighting();
  const navigation = useNavigation();
  const [started, setStarted] = useState(false);
  const [color1, color2] = getMoodColors(mood);

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
    navigation.setOptions({ tabBarStyle: { display: "none" } });
    setStarted(true);
    opacity.value = withTiming(1, { duration: 500 });
  };

  const stopFlicker = () => {
    opacity.value = withTiming(0, { duration: 500 }, (finished) => {
      if (finished) {
        runOnJS(() => {
          setStarted(false);
          navigation.setOptions({ tabBarStyle: { display: "flex" } });
        })();
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
          colors={[
            `${color1}B3`, // pastelized outer
            `${color1}80`, // medium
            `${color2}4D`, // lighter near center
          ]}
          style={{ flex: 1, width, height }}
        >
          <Animated.View
            className="flex-1 justify-center items-center shadow-xl shadow-black/70"
            style={buttonStyle}
          >
            {/* Concentric 3D circles */}
            {/* <View className="absolute items-center justify-center">
              Outer circle 
              <View className="w-72 h-72 rounded-full  shadow-lg shadow-black/30" />

               Mid circle 
              <View className="absolute w-60 h-60 rounded-full bg-white/20 shadow-md shadow-black/40" />
              {/* Inner circle 
              <View className="absolute w-48 h-48 rounded-full bg-white/30 shadow-md shadow-black/50" />
            </View> */}

            {/* Gradient Ring */}
            <LinearGradient
              colors={["#ffffffaa", "#ffffff33"]}
              style={{
                padding: 4,
                borderRadius: 9999,
              }}
            >
              {/* Glassy Start Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-48 h-48 rounded-full bg-white/25 border border-white/40 justify-center items-center"
                onPress={startFlicker}
              >
                <Ionicons name="play" size={42} color={color2} />
                <Text
                  style={{ color: color2 }}
                  className="font-bold text-lg mt-1"
                >
                  Start
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>

          {/* Controls */}
          <View className="absolute bottom-[20%] w-[90%] self-center items-center space-y-5">
            <ModeToggle />
          </View>
        </LinearGradient>
      )}
    </View>
  );
}
