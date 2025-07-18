import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return(
    <Stack>
    <Stack.Screen
      name="home"
      options={{
        headerShown: false,
       }} />
    </Stack>
  );
    
}
