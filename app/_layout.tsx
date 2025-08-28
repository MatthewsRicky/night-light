import { LightingProvider, useLighting } from "@/context/LightingContext";
import { UIProvider, useUI } from "@/context/UIContext";
import { getContrastingColor } from "@/utils/colorUtils";
import { getMoodColors } from "@/utils/moodColors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css"

function AppTabs() {
  const { tabBarVisible } = useUI(); // 👈 state from context
  // TODO: Replace 'warm' with actual mood state or prop as needed
   const { mood } = useLighting();
  const [color1, color2] = getMoodColors(mood);
  const textColor = getContrastingColor(color1);
  

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: tabBarVisible ? "flex" : "none", // 👈 reactive toggle
          backgroundColor: color2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sunny" color={color1} size={size} />
          ),
          title: "Light",
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
          tabBarActiveTintColor: "gold",
          tabBarInactiveTintColor: "white",
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" color={color} size={size} />
          ),
          title: "Mood",
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
          tabBarActiveTintColor: "gold",
          tabBarInactiveTintColor: "white",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          title: "settings",
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
          tabBarActiveTintColor: "gold",
          tabBarInactiveTintColor: "white",
        }}
      />
    </Tabs>
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      <LightingProvider>
        <UIProvider>
          <AppTabs />
          {/* Your custom nav stays here if needed */}
          {/* <BottomNav /> */}
        </UIProvider>
      </LightingProvider>
    </SafeAreaProvider>
  );
}
