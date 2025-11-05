import StartScreen from "@/components/StartScreen";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";

export default function Home() {
  // Prevent splash from auto-hiding
  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    async function prepare() {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate load
      await SplashScreen.hideAsync(); // hide when ready
    }

    prepare();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <View style={{ flex: 1 }}>
        <StartScreen />
      </View>
    </SafeAreaView>
  );
}
