import { createContext, useState } from "react";

export const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <div className={`${mode} theme`}>{children}</div>
    </ThemeContext.Provider>
  );
};
