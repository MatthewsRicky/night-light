import React, { createContext, ReactNode, useContext, useState } from "react";

type UIContextType = {
  tabBarVisible: boolean;
  setTabBarVisible: (visible: boolean) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);
export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tabBarVisible, setTabBarVisible] = useState(true);

  return (
    <UIContext.Provider value={{ tabBarVisible, setTabBarVisible }}>
      {children}
    </UIContext.Provider>
  );
};
export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
