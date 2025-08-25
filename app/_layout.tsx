import BottomNav from "@/components/BottomNav";
import { LightingProvider } from "@/context/LightingContext";
import { UIProvider } from "@/context/UIContext";
import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <LightingProvider>
        <UIProvider>
          <View style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false, // keep consistent UI
              }}
            />
            {/* Persistent bottom nav */}
            <BottomNav />
          </View>
        </UIProvider>
      </LightingProvider>
    </SafeAreaProvider>
  );
}
