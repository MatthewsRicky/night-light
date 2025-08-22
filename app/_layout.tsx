import { LightingProvider } from "@/context/LightingContext";
import { UIProvider, useUI } from "@/context/UIContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import "./globals.css";

function TabBarIcon({
  name,
  color,
  size,
}: {
  name: any;
  color: string;
  size: number;
}) {
  return <Ionicons name={name} size={size} color={color} />;
}

function AppTabs() {
  const { tabBarVisible } = useUI();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "gold",
        tabBarInactiveTintColor: "silver",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },

        tabBarStyle: tabBarVisible
          ? {
              backgroundColor: "#FFD70033",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              height: 100,
            }
          : {
              height: 0, // 👈 removes reserved space
              backgroundColor: "transparent",
              borderTopWidth: 0,
            },

        // 👇 Transparent background (prevents ghost white)
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: "transparent" }} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Light",
          headerShown: false,
          tabBarIcon: (props) => <TabBarIcon name="sunny-outline" {...props} />,
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          title: "Mood",
          headerShown: true,
          tabBarIcon: (props) => (
            <TabBarIcon name="color-palette-outline" {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: true,
          tabBarIcon: (props) => (
            <TabBarIcon name="settings-outline" {...props} />
          ),
        }}
      />
    </Tabs>
  );
}
export default function Layout() {
  return (
    <LightingProvider>
      <UIProvider>
        <AppTabs />
      </UIProvider>
    </LightingProvider>
  );
}
