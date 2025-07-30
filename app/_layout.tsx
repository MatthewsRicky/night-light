// app/_layout.tsx
import { LightingProvider } from "@/context/LightingContext";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <LightingProvider>
      <Tabs>
        <Tabs.Screen name="index" options={{ title: "Light" }} />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
        <Tabs.Screen name="timer" options={{ title: "Timer" }} />
      </Tabs>
    </LightingProvider>
  );
}
