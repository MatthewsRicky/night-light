import { useNavigation } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FlickerLight from "../components/FlickerLight";
import "./globals.css";

export default function HomeScreen() {
  const [started, setStarted] = useState(false);

  const navigation = useNavigation();

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
    navigation.setOptions({
      headerShown: !started,
      tabBarStyle: { display: started ? "none" : "flex" },
    });
  }, [started]);
  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar hidden={started} style="light" />

      {started ? (
        <TouchableWithoutFeedback onPress={handleStop}>
          <View className="flex-1">
            <FlickerLight />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View className="flex-1 mx-auto justify-center items-center">
          <Pressable
            onPress={handleStart}
            className="bg-emerald-400/80 px-6 py-3 rounded-xl"
          >
            <Text className="text-black underline underline-offset-2 font-bold text-3xl p-2">
              Start
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
