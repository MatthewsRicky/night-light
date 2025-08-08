//import ColorPicker from "@/components/ColorPicker";
import ModeToggle from "@/components/ModeToggle";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import FlickerLight from "../components/FlickerLight";
import "./globals.css";

export default function HomeScreen() {
  const [started, setStarted] = useState(false);

  const params = useLocalSearchParams();

  const navigation = useNavigation();

  const router = useRouter();

  const handleStart = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
    setStarted(true);
  };

  const handleStop = async () => {
    await ScreenOrientation.unlockAsync();
    setStarted(false);
  };

  useEffect(() => {
    if (params.autoStart === "true") {
      handleStart();
      router.setParams({ autoStart: undefined });
    }
  }, [params.autoStart]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: !started,
      tabBarStyle: { display: started ? "none" : "flex" },
    });
  }, [started]);
  return (
    <View className="flex-1 bg-blue-300/40">
      <StatusBar hidden={started} style="dark" />

      {started ? (
        <TouchableWithoutFeedback onPress={handleStop}>
          <View className="flex-1 justify-center items-center">
            <FlickerLight />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View className="flex-1 justify-around items-center bg-blue-300/40">
          {/* <ColorPicker value={warmth} onChange={setWarmth} /> */}
          <Pressable
            onPress={handleStart}
            className="bg-emerald-400/10 shadow-slate-100 px-6 py-3 rounded-xl"
          >
            <Text className="text-black font-semibold text-xl p-2">Start</Text>
          </Pressable>
          <View className="fle-[0.4] items-center justify-center">
            <ModeToggle />
          </View>
        </View>
      )}
    </View>
  );
}
