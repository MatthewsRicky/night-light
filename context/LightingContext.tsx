import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Mood = "warm" | "cool" | "green" | "purple" | "pink" | "yellow";

const moodColorsMap: Record<Mood, [string, string]> = {
  cool: ["#cceeff", "#3366ff"],
  green: ["#d0ffd0", "#00cc66"],
  purple: ["#e0d0ff", "#9933ff"],
  pink: ["#ffd6e7", "#ff69b4"],
  yellow: ["#fffdd0", "#ffcc00"],
  warm: ["#ffecc7", "#ff9933"],
};

interface LightingContextProps {
  mode: "flicker" | "ambient";
  setMode: (mode: "flicker" | "ambient") => void;
  flickerSpeed: number;
  setFlickerSpeed: (value: number) => void;
  mood: Mood;
  setMood: (value: Mood) => void;
  moodColors: [string, string];
  warmth: number;
  setWarmth: (value: number) => void;
}

const LightingContext = createContext<LightingContextProps | undefined>(
  undefined
);

export const LightingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [warmth, setWarmth] = useState(0.5);
  const [mode, setMode] = useState<"flicker" | "ambient">("flicker");
  const [flickerSpeed, setFlickerSpeed] = useState(300);
  const [mood, setMood] = useState<Mood>("warm");

  const moodColors = useMemo(() => moodColorsMap[mood], [mood]);

  // Load saved values on mount
  useEffect(() => {
    AsyncStorage.multiGet(["warmth", "mode", "flickerSpeed", "mood"]).then(
      (values) => {
        values.forEach(([key, value]) => {
          if (!value) return;
          if (key === "warmth") setWarmth(JSON.parse(value));
          if (key === "mode") setMode(value as "flicker" | "ambient");
          if (key === "flickerSpeed") setFlickerSpeed(JSON.parse(value));
          if (key === "mood") setMood(value as Mood);
        });
      }
    );
  }, []);

  // Save to storage when values change
  useEffect(() => {
    AsyncStorage.setItem("warmth", JSON.stringify(warmth));
  }, [warmth]);
  useEffect(() => {
    AsyncStorage.setItem("mode", mode);
  }, [mode]);
  useEffect(() => {
    AsyncStorage.setItem("flickerSpeed", JSON.stringify(flickerSpeed));
  }, [flickerSpeed]);
  useEffect(() => {
    AsyncStorage.setItem("mood", mood);
  }, [mood]);

  return (
    <LightingContext.Provider
      value={{
        mood,
        setMood,
        mode,
        setMode,
        flickerSpeed,
        setFlickerSpeed,
        warmth,
        setWarmth,
        moodColors,
      }}
    >
      {children}
    </LightingContext.Provider>
  );
};

export const useLighting = () => {
  const context = useContext(LightingContext);
  if (!context)
    throw new Error("useLighting must be used within a LightingProvider");
  return context;
};
