"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center transition-colors duration-200 ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } 
        hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 gap-3 
        ${isActive ? "bg-blue-500! text-white!" : "text-foreground"} 
        `}
      >
        <Icon
          className={`size-6 ${isActive ? "text-white" : "text-foreground"}`}
        />

        <span
          className={`${isCollapsed ? "hidden" : "block"} font-medium ${
            isActive ? "text-white" : "text-foreground"
          }`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed bg-surface flex flex-col transition-all duration-300 overflow-hidden h-full shadow-md z-50 border-r border-border-main ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  }`;

  return (
    <div className={sidebarClassNames}>
      {/* logo */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div className="text-blue-600">logo</div>
        <h1
          className={`font-extrabold text-2xl text-foreground ${
            isSidebarCollapsed ? "hidden" : "block"
          }`}
        >
          saintSTOCK
        </h1>
        <button
          title="menu-btn"
          className="md:hidden px-3 py-3 bg-background rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40"
          onClick={toggleSidebar}
        >
          <Menu className="size-4 text-foreground" />
        </button>
      </div>

      {/* links */}
      <div className="grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* footer */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2025 SaintStock
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
