import React, { createContext, useContext, useState } from "react";

interface LightingContextProps {
  warmth: number;
  setWarmth: (value: number) => void;
  mode: "flicker" | "ambient";
  setMode: (mode: "flicker" | "ambient") => void;
  flickerSpeed: number;
  setFlickerSpeed: (value: number) => void;
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

  return (
    <LightingContext.Provider
      value={{
        warmth,
        setWarmth,
        mode,
        setMode,
        flickerSpeed,
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
