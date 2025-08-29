import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Mood =
  | "lithium"
  | "sodium"
  | "potassium"
  | "rubidium"
  | "cesium"
  | "calcium"
  | "strontium"
  | "barium"
  | "copper"
  | "boron"
  | "iron"
  | "manganese"
  | "lead"
  | "antimony"
  | "arsenic"
  | "phosphorus"
  | "selenium"
  | "thallium"
  | "indium"
  | "tungsten";

const moodColorsMap: Record<Mood, [string, string]> = {
  lithium: ["#ffccd5", "#ff4d6d"], // crimson/pink flame
  sodium: ["#fff2b2", "#ffcc33"], // golden yellow
  potassium: ["#d8c2ff", "#9966ff"], // soft violet
  rubidium: ["#ffcce6", "#ff3399"], // reddish purple
  cesium: ["#ccf2ff", "#3399ff"], // sky blue
  calcium: ["#fff5cc", "#ffdd66"], // orange-red/amber
  strontium: ["#ffd6cc", "#ff3300"], // bright red
  barium: ["#e6ffcc", "#66ff33"], // apple green
  copper: ["#ccffee", "#00ffaa"], // blue-green
  boron: ["#d9e6ff", "#3366ff"], // blue
  iron: ["#fff0cc", "#ff6600"], // orange (sparks)
  manganese: ["#e6ccff", "#9933cc"], // pale lilac to purple
  lead: ["#f2f2f2", "#cccccc"], // grayish (subdued white)
  antimony: ["#f0f0f0", "#e6e6ff"], // pale blue-white
  arsenic: ["#ccffe6", "#33cc99"], // turquoise green
  phosphorus: ["#ffffe0", "#ffff66"], // glowing yellow-white
  selenium: ["#ffcccc", "#ff3300"], // deep red
  thallium: ["#e6ffcc", "#66cc00"], // green
  indium: ["#d6e0ff", "#3366cc"], // blue-violet
  tungsten: ["#e0e0ff", "#9999ff"], // bluish white
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
  const [mood, setMood] = useState<Mood>("calcium");

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
