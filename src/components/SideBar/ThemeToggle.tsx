import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { FC } from "react";
import { Item } from "./Item";

export const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Item
      label={theme === "dark" ? "ライトモード" : "ダークモード"}
      icon={theme === "dark" ? Sun : Moon}
      onClick={toggleTheme}
    />
  );
};
