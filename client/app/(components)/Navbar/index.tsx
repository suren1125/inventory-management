"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed, setIsDarkMode } from "@/state";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="sticky top-0 z-40 flex justify-between bg-background/80 backdrop-blur-lg items-center w-full mb-5 py-3 transition-colors duration-300">
      {/* left side in navbar */}
      <div className="flex justify-between items-center gap-5">
        <button
          title="menu-btn"
          className="px-3 py-3 bg-surface rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 text-foreground transition-colors"
          onClick={toggleSidebar}
        >
          <Menu className="size-4" />
        </button>

        {/* search bar */}
        {/* <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups & products..."
            className="pl-10 pr-4 py-2 mr-5 w-50 md:w-60 border-2 border-border-main bg-surface text-foreground rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div> */}
      </div>

      {/* right side in navbar */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="size-9 bg-surface rounded-full flex items-center justify-center text-xs text-foreground border border-border-main">
              IMG
            </div>
            <span className="font-semibold text-foreground group-hover:text-blue-500 transition-colors">
              Suren
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-border-main mx-3" />
        </div>

        {/* dark mode toggle */}
        <div>
          <button
            title="toggle-theme"
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-surface transition-colors"
          >
            {isDarkMode ? (
              <Sun className="cursor-pointer text-gray-500" size={24} />
            ) : (
              <Moon className="cursor-pointer text-gray-500" size={24} />
            )}
          </button>
        </div>

        <Link
          href="/settings"
          className="p-2 rounded-lg hover:bg-surface transition-colors"
        >
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
