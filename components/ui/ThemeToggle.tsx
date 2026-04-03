"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder to avoid layout shift
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <motion.div
          key="sun"
          initial={false}
          animate={{
            scale: currentTheme === "dark" ? 0 : 1,
            opacity: currentTheme === "dark" ? 0 : 1,
            rotate: currentTheme === "dark" ? -90 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        </motion.div>

        <motion.div
          key="moon"
          initial={false}
          animate={{
            scale: currentTheme === "dark" ? 1 : 0,
            opacity: currentTheme === "dark" ? 1 : 0,
            rotate: currentTheme === "dark" ? 0 : 90,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        </motion.div>
      </div>
    </button>
  );
}
