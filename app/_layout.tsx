import { LightingProvider } from "@/context/LightingContext";
import { UIProvider } from "@/context/UIContext";
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
  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
      className="flex items-center justify-around"
    />
  );
}

export default function Layout() {
  return (
    <LightingProvider>
      <UIProvider>
        <Tabs>
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
      </UIProvider>
    </LightingProvider>
  );
}
