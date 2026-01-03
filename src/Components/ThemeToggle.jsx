import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const ThemeToggle = () => {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        checked={dark}
        onChange={() => setDark(!dark)}
        className="sr-only bg-red-500"
      />

      {/* Toggle background */}
      <div className="w-14 h-8 bg-gray-300 dark:bg-zinc-700  rounded-full transition-colors"></div>

      {/* Toggle circle */}
      <div
        className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm transition-all
          ${dark ? "translate-x-6" : "translate-x-0"}`}
      >
        {dark ? "🌙" : "☀️"}
      </div>
    </label>
  );
};

export default ThemeToggle;
