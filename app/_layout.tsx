// app/_layout.tsx
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Light" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      <Tabs.Screen name="timer" options={{ title: "Timer" }} />
    </Tabs>
  );
}
