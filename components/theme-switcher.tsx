"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [icon, setIcon] = useState<JSX.Element>(<MoonIcon />);

  useEffect(() => {
    setIcon(resolvedTheme === "light" ? <MoonIcon /> : <SunIcon />);
  }, [resolvedTheme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {icon}
    </Button>
  );
}
