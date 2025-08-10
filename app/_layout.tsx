import { LightingProvider } from "@/context/LightingContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
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

export default function Layout() {
  return (
    <LightingProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#f59e0b",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Light",
            headerShown: false,
            tabBarIcon: (props) => (
              <TabBarIcon name="sunny-outline" {...props} />
            ),
          }}
        />
        <Tabs.Screen
          name="mood"
          options={{
            title: "Mood",
            headerShown: false,
            tabBarIcon: (props) => (
              <TabBarIcon name="color-palette-outline" {...props} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: (props) => (
              <TabBarIcon name="settings-outline" {...props} />
            ),
          }}
        />
      </Tabs>
    </LightingProvider>
  );
}
