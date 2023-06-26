import { useContext } from "react";
import { ThemeContext } from "../contexts/theme";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const { mode } = useContext(ThemeContext);

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden justify-between text-base md:text-md container lg:w-1/2 md:w-3/4 mx-auto py-4 px-6"
      style={mode === "light" ? { color: "#111" } : { color: "#bbb" }}
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
