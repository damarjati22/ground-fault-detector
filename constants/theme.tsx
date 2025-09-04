import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextType>({ theme: "light" });

const ThemeProvider = ({ children }: ThemeProviderProps)=> {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";

  return (
    <ThemeContext.Provider value={{ theme: scheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
