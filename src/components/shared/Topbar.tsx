/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Bell, Menu, MoreVertical, User, Search, Settings } from "lucide-react";
import { RiBarChartHorizontalLine, RiMenuLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppSidebar } from "./Sidebar";
import { IoAdd, IoLink } from "react-icons/io5";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutUser, selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { useLogoutMutation } from "@/redux/featured/auth/authApi";
import { signOut } from "next-auth/react";

interface TopNavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  role?: string;
}

export function TopNavbar({ isSidebarOpen, toggleSidebar }: TopNavbarProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    if (currentUser?._id) {
      try {
        await logout(currentUser._id).unwrap();
      } catch (err) {}
    }
    dispatch(logoutUser());
    await signOut({ callbackUrl: "/auth/login" });
  };
  return (
    <div className="flex items-center w-full justify-between gap-4 px-4 py-3 md:px-6 lg:px-8 xl:px-10 2xl:px-12 bg-white sticky top-0 z-30 border-b border-gray-200 ">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100 rounded-lg"
              aria-label="Open sidebar menu"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <AppSidebar
              isOpen={open}
              onClose={() => setOpen(false)}
              isCollapsed={false}
            />
          </SheetContent>
        </Sheet>

        {/* Desktop Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex hover:bg-gray-100 rounded-lg"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <RiBarChartHorizontalLine className="h-5 w-5 text-gray-600" />
          ) : (
            <RiBarChartHorizontalLine className="h-5 w-5 text-gray-600" />
          )}
        </Button>
      </div>

      {/* Middle - Search Bar - Now fully responsive */}
      <div className="flex-1 mx-2 md:mx-4">
      </div>

      {/* Right side */}
      <div className="flex items-center justify-end gap-2">
        {/* Action Buttons - Hidden on small screens */}
        <div className="hidden md:flex items-center gap-1">
        </div>

        {/* Icon Buttons */}
        <div className="hidden md:flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:bg-gray-100 rounded-lg relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
          </Button>
        </div>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-100 ml-1">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-medium text-gray-800">
                  {currentUser?.name}
                </span>
                <span className="text-xs text-gray-500">
                  {currentUser?.email}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 shadow-lg rounded-lg border border-gray-200"
          >
            <div className="px-3 py-2 border-b">
              <p className="text-sm font-medium"> {currentUser?.name}</p>
              <p className="text-xs text-gray-500 truncate">
                {currentUser?.email}
              </p>
            </div>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50">
              <Link href="/admin/profile">
                <p className="flex gap-2 items-center">
                  <User className="h-4 w-4" /> Profile
                </p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50">
              <Link href="/admin/shop-setting">
                <p className="flex gap-2 items-center">
                  <Settings className="h-4 w-4" /> Settings
                </p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center cursor-pointer gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <span>🚪</span>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile dropdown - for small screens */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              align="end"
              className="w-64 p-2 space-y-2 rounded-lg border border-gray-200 shadow-lg"
            >
              <div className="grid grid-cols-2 gap-1 px-2">
                <Link href={`/create-shop`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-700 hover:bg-gray-50 border-gray-300"
                  >
                    <IoAdd />
                    <span className="ml-2">Create Shop</span>
                  </Button>
                </Link>
                <Link href={`https://dressen-home.vercel.app/`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-100 bg-gray-700 border-gray-100"
                  >
                    <IoLink />
                    <span className="ml-2">Visit Site</span>
                  </Button>
                </Link>
              </div>

              <div className="flex justify-around px-2 pt-1 border-t">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:bg-gray-100"
                  aria-label="Settings"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:bg-gray-100 relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
                </Button>
              </div>

              <div className="border-t pt-1">
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <span>🚪</span>
                  Logout
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
