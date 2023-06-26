import { ThemeContext } from "../contexts/theme";
import { useContext } from "react";

const ToggleMode = () => {
  const { mode, toggle } = useContext(ThemeContext);

  return (
    <>
      <div
        className="flex justify-between items-center border rounded-full px-1 gap-2 cursor-pointer relative text-sm transition duration-500 ease-in"
        style={
          mode === "light"
            ? { border: "1px solid #111" }
            : { border: "1px solid #bbb" }
        }
        onClick={toggle}
      >
        <div>☀️</div>
        <div>🌙</div>
        <div
          className="absolute w-4 h-4 rounded-full bg-emerald-500 cursor-pointer"
          style={mode === "light" ? { left: "4px" } : { right: "4px" }}
        />
      </div>
    </>
  );
};

export default ToggleMode;
