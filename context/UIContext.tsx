// context/UIContext.tsx
import React, { createContext, useContext, useState } from "react";

type UIContextType = {
  tabBarVisible: boolean;
  hideTabBar: () => void;
  showTabBar: () => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [tabBarVisible, setTabBarVisible] = useState(true);

  return (
    <UIContext.Provider
      value={{
        tabBarVisible,
        hideTabBar: () => setTabBarVisible(false),
        showTabBar: () => setTabBarVisible(true),
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
};
