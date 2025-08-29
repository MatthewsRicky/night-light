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
          borderColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sunny" color={color} size={size} />
          ),
          title: "Light",
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: color2,
            borderBottomColor: color2,
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: textColor,
            textAlign: "center",
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" color={color} size={size} />
          ),
          title: "Mood",
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: color1,
            borderBottomColor: color2 + "50",
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: textColor,
            textAlign: "center",
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          title: "settings",
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
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
