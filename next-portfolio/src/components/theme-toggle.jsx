"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm font-semibold hover:text-slate-300 outline-none">
        테마 ▾
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          밝게
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          어둡게
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          시스템 설정
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
