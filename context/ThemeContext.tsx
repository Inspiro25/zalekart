import React, { createContext, useContext } from "react";

type ThemeContextType = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  isDarkMode: boolean;
};

// Modern light theme with blue primary color
const theme: ThemeContextType = {
  primaryColor: "#151D3B",
  secondaryColor: "#3b82f6", 
  accentColor: "#ef4444",
  backgroundColor: "#f3f4f6",
  isDarkMode: false,
};

const ThemeContext = createContext<ThemeContextType>(theme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
