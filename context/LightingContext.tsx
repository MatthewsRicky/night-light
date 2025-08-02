import React, { createContext, useContext, useState } from "react";

export type Mood = "warm" | "cool" | "green" | "purple" | "pink" | "yellow";

interface LightingContextProps {
  mode: "flicker" | "ambient";
  setMode: (mode: "flicker" | "ambient") => void;
  flickerSpeed: number;
  setFlickerSpeed: (value: number) => void;
  mood: Mood;
  setMood: (value: Mood) => void;
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

  return (
    <LightingContext.Provider
      value={{
        mood,
        setMood,
        mode,
        setMode,
        flickerSpeed,
        warmth,
        setWarmth,
        setFlickerSpeed,
      }}
    >
      {children}
    </LightingContext.Provider>
  );
};

export const useLighting = () => {
  const context = useContext(LightingContext);
  if (!context) {
    throw new Error("useLighting must be used within a LightingProvider");
  }
  return context;
};
