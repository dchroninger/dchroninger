import { createContext, Dispatch, SetStateAction } from "react";

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  systemTheme: boolean;
  setSystemTheme: Dispatch<SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  setDarkMode: () => {},
  systemTheme: false,
  setSystemTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;
