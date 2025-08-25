import { createContext, useContext, useState } from "react";

const UIContext = createContext<{
  tabBarVisible: boolean;
  showTabBar: () => void;
  hideTabBar: () => void;
}>({
  tabBarVisible: true,
  showTabBar: () => {},
  hideTabBar: () => {},
});

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [tabBarVisible, setTabBarVisible] = useState(true);

  const showTabBar = () => setTabBarVisible(true);
  const hideTabBar = () => setTabBarVisible(false);

  return (
    <UIContext.Provider value={{ tabBarVisible, showTabBar, hideTabBar }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
