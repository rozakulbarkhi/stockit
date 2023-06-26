import { useEffect, useState } from "react";
import ToggleMode from "./ToggleMode";
import { AiOutlineUser } from "react-icons/ai";
import cookie from "js-cookie";

const Navbar = () => {
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    cookie.remove("token");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center">
      <a href="/" className="tracking-widest font-bold md:text-xl text-lg">
        Stock it.
      </a>
      <div className="flex md:gap-6 gap-4 items-center justify-center">
        <ToggleMode />
        {user?.username && (
          <div
            className="md:text-sm text-sm cursor-pointer relative"
            onClick={() => setOpen((prev) => !prev)}
          >
            <AiOutlineUser className="text-lg" />
          </div>
        )}

        {open && (
          <div className="absolute top-12 md:right-auto bg-white shadow-md rounded px-3 py-2 text-slate-500 md:text-sm text-sm flex flex-col gap-1">
            <div className="">Halo, {user.username}</div>
            <div
              href="/logout"
              className="cursor-pointer hover:text-slate-600"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
