"use client";

import React, { useMemo, useState, useEffect, ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Tag,
  CreditCard,
  Plus,
  Shield,
  X,
  ArrowRightLeft,
  Package,
  BarChart3,
  Hash,
  Palette,
  Calculator,
  Truck,
  ChevronDown,
  Box,
  PlusCircle,
  Settings,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { IoColorFill } from "react-icons/io5";

type Role = "admin" | "vendor" | "sr" | "customer" | "user";

type IconRenderer = ComponentType<{
  className?: string;
  size?: number | string;
}>;

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role?: Role;
  isCollapsed: boolean;
}

function readUserRole(u: unknown): string | undefined {
  if (typeof u !== "object" || u === null) return undefined;
  if (!("role" in u)) return undefined;
  const r = (u as { role?: unknown }).role;
  return typeof r === "string" ? r : undefined;
}
function normalizeRole(value: unknown): Role {
  if (typeof value !== "string") return "user";
  const v = value.toLowerCase();
  if (["admin", "superadmin", "owner", "root"].includes(v)) return "admin";
  if (["vendor", "seller", "merchant", "shop_owner"].includes(v))
    return "vendor";
  if (
    [
      "sr",
      "sales",
      "sales_rep",
      "sales-rep",
      "sales_representative",
      "representative",
    ].includes(v)
  )
    return "sr";
  if (["customer", "client", "buyer"].includes(v)) return "customer";
  return "user";
}
export function AppSidebar({
  isOpen,
  onClose,
  role: roleProp,
  isCollapsed,
}: AppSidebarProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const derivedRole = normalizeRole(readUserRole(currentUser));
  const role: Role = roleProp ?? derivedRole;
  // const role = "sr";

  const pathnameRaw = usePathname();
  const pathname = typeof pathnameRaw === "string" ? pathnameRaw : "/";
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const [openSection, setOpenSection] = useState<string | null>(null);

  const dashboardHref =
    role === "admin"
      ? "/admin"
      : role === "sr"
      ? "/sr"
      : role === "vendor"
      ? "/vendor"
      : role === "customer"
      ? "/customer"
      : "/";

  // Admin/Vendor navigation model (unchanged)
  const navigationItems = useMemo(
    () => ({
      productManagement: [
        {
          icon: Package as IconRenderer,
          label: "All Products",
          href: "/admin/all-product",
        },
        {
          icon: Package as IconRenderer,
          label: "Add New Product",
          href: "/admin/add-new-product",
        },
        {
          icon: Package as IconRenderer,
          label: "Draft Products",
          href: "/admin/draft-products",
        },
        {
          icon: Hash as IconRenderer,
          label: "Categories",
          href: "/admin/category-management",
        },
        {
          icon: Tag as IconRenderer,
          label: "Tags",
          href: "/admin/tag-management",
        },
        {
          icon: Box as IconRenderer,
          label: "Brand",
          href: "/admin/brand-management",
        },
        {
          icon: Palette as IconRenderer,
          label: "Attributes",
          href: "/admin/product-attributes",
        },
        {
          icon: BarChart3 as IconRenderer,
          label: "Inventory",
          href: "/admin/inventory-management",
        },
      ],
      productVendor: [
        {
          icon: Package as IconRenderer,
          label: "All Products",
          href: "/admin/all-product",
        },
        {
          icon: Package as IconRenderer,
          label: "Add New Product",
          href: "/admin/add-new-product",
        },
      ],
      WithdrawalsManagement: [
        {
          icon: CreditCard as IconRenderer,
          label: "Withdrawals Manage",
          href: "/admin/withdrawals",
        },
      ],
      orderManagement: [
        {
          icon: ShoppingCart as IconRenderer,
          label: "Orders",
          href: "/admin/order",
        },
        // {
        //   icon: ArrowRightLeft as IconRenderer,
        //   label: "Transactions",
        //   href: "/admin/transaction",
        // },
      ],
      settingManagement: [
        {
          icon: Settings as IconRenderer,
          label: "General Settings",
          href: "/admin/settings/general",
        },
        {
          icon: IoColorFill as IconRenderer,
          label: "Appearance",
          href: "/admin/settings/appearance",
        },
        {
          icon: Tag as IconRenderer,
          label: "Coupons",
          href: "/admin/settings/coupons",
        },
      ],
       // -------- Courier Management (Separate Section) --------
      courierManagement: [
        {
          icon: Truck as IconRenderer,
          label: "Courier Dashboard",
          href: "/admin/courier/dashboard",
        },
        // {
        //   icon: Package as IconRenderer,
        //   label: "Create Order",
        //   href: "/admin/courier/create-order",
        // },
        // {
        //   icon: Package as IconRenderer,
        //   label: "Bulk Orders",
        //   href: "/admin/courier/bulk-order",
        // },
        // {
        //   icon: MapPin as IconRenderer,
        //   label: "Track Delivery",
        //   href: "/admin/courier/track-delivery",
        // },
        // {
        //   icon: ArrowRight as IconRenderer,
        //   label: "Return Requests",
        //   href: "/admin/courier/return-requests",
        // },
      ],
      orderVendor: [
        {
          icon: ShoppingCart as IconRenderer,
          label: "Orders",
          href: "/admin/order",
        },
      ],
    }),
    []
  );

  // SR items
  const srOrderItems: ReadonlyArray<{
    icon: IconRenderer;
    label: string;
    href: string;
  }> = [
    { icon: ShoppingCart as IconRenderer, label: "Orders", href: "/sr/orders" },
    {
      icon: Plus as IconRenderer,
      label: "Create Order",
      href: "/sr/create-order",
    },
  ];

  const srWalletItems = [
    {
      icon: Calculator as IconRenderer,
      label: "withdrawal Status",
      href: "/sr/approved-withdrawal",
    },
    {
      icon: PlusCircle as IconRenderer,
      label: "Create Withdrawal",
      href: "/sr/create-withdrawal",
    },
  ] as const;

  // auto-open SR Orders section if inside any /sr/orders/* route
  const isInSrOrders =
    role === "sr" &&
    (pathname.startsWith("/sr/orders") ||
      pathname.startsWith("/sr/create-order"));
  useEffect(() => {
    if (isInSrOrders) setOpenSection("srOrderManagement");
  }, [isInSrOrders]);

  const renderLink = (href: string, Icon: IconRenderer, label: string) => (
    <Link
      href={href}
      key={`link-${href}`}
      onClick={() => {
        if (typeof window !== "undefined" && window.innerWidth < 768) onClose();
      }}
      className={cn(
        "flex items-center gap-3 rounded-md text-sm transition-all duration-200 ease-in-out",
        "px-3 py-2.5",
        isActive(href)
          ? "bg-blue-50 text-blue-700 font-medium"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
        isCollapsed ? "justify-center px-2" : "pl-4",
        "transform hover:translate-x-1"
      )}
    >
      <Icon
        size={18}
        className={cn(
          "flex-shrink-0",
          isActive(href) ? "text-blue-700" : "text-gray-600",
          "transition-colors duration-200"
        )}
      />
      {!isCollapsed && (
        <span className="truncate transition-opacity duration-200">
          {label}
        </span>
      )}
    </Link>
  );

  const renderCollapsible = (
    Icon: IconRenderer,
    label: string,
    items: ReadonlyArray<{ icon: IconRenderer; label: string; href: string }>,
    sectionKey: string
  ) => {
    const isOpen = openSection === sectionKey;

    return (
      <Collapsible
        key={`collapsible-${sectionKey}`}
        open={isOpen}
        onOpenChange={() => setOpenSection(isOpen ? null : sectionKey)}
        className="transition-all duration-200 ease-in-out"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between rounded-md p-0 h-auto font-normal transition-all duration-200 ease-in-out",
              "hover:bg-gray-50 px-3 py-2.5",
              isCollapsed ? "justify-center px-2" : "pl-4",
              "text-gray-600 hover:text-gray-900",
              "group"
            )}
          >
            <div className="flex items-center gap-3">
              <Icon
                size={18}
                className="flex-shrink-0 transition-colors duration-200"
              />
              {!isCollapsed && (
                <span className="truncate transition-opacity duration-200">
                  {label}
                </span>
              )}
            </div>
            {!isCollapsed && (
              <ChevronDown
                size={16}
                className={cn(
                  "transition-all duration-200",
                  isOpen ? "rotate-180" : "",
                  "text-gray-500",
                  "group-hover:text-blue-600"
                )}
              />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isCollapsed ? "ml-0" : "ml-2 pl-6 border-l border-gray-200",
            "data-[state=open]:animate-collapsible-down",
            "data-[state=closed]:animate-collapsible-up"
          )}
        >
          <div className="space-y-1 mt-1">
            {items.map((item) => (
              <Link
                key={`${sectionKey}-${item.href}`}
                href={item.href}
                onClick={() => {
                  if (typeof window !== "undefined" && window.innerWidth < 768)
                    onClose();
                }}
                className={cn(
                  "flex items-center gap-3 rounded-md text-sm font-normal transition-all duration-200 ease-in-out",
                  "px-3 py-2 hover:bg-gray-50 w-full",
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:text-gray-900",
                  isCollapsed ? "justify-center px-2" : "",
                  "transform hover:translate-x-1"
                )}
              >
                <item.icon
                  size={18}
                  className={cn(
                    "flex-shrink-0",
                    isActive(item.href) ? "text-blue-700" : "text-gray-600",
                    "transition-colors duration-200"
                  )}
                />
                {!isCollapsed && (
                  <span className="truncate transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  const renderSection = (
    title: string,
    items: { icon: IconRenderer; label: string; href: string }[]
  ) => (
    <div key={`section-${title}`} className="space-y-1">
      {!isCollapsed && (
        <h3 className="px-4 py-2 text-left uppercase text-xs font-semibold text-gray-400 tracking-wider transition-opacity duration-200">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {items.map((item) => renderLink(item.href, item.icon, item.label))}
      </div>
    </div>
  );

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 h-screen bg-white text-black",
        "flex flex-col transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0 md:static",
        isCollapsed ? "w-11 md:w-16" : "w-64",
        "overflow-hidden"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-3 p-4 bg-white h-16 transition-all duration-300",
          isCollapsed ? "justify-center px-2" : "px-5",
          "shrink-0"
        )}
      >
        <Image
          src="/dressen.png"
          alt="Logo"
          width={30}
          height={30}
          className="flex-shrink-0 rounded transition-transform duration-300 hover:scale-110"
        />
        {!isCollapsed && (
          <h1 className="text-lg font-bold text-black truncate transition-opacity duration-200">
            dressen
          </h1>
        )}
      </div>

      {/* Mobile Close */}
      {!isCollapsed && (
        <div className="flex items-center justify-between p-4 md:hidden border-b">
          <h2 className="text-lg font-bold text-black">Menu</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 hover:rotate-90"
          >
            <X className="h-6 w-6 text-gray-400 transition-transform duration-300" />
          </button>
        </div>
      )}

      <nav className="flex-1 p-2 overflow-y-auto space-y-4 transition-all duration-300 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {/* MAIN / Dashboard */}
        <div key="main-section">
          {!isCollapsed && (
            <h3 className="px-4 py-2 text-left uppercase text-xs font-semibold text-gray-400 tracking-wider transition-opacity duration-200">
              MAIN
            </h3>
          )}
          {renderLink(dashboardHref, LayoutDashboard, "Dashboard")}
        </div>

        {/* SR: Dashboard এর নিচে ORDER MANAGEMENT (collapsible) */}
        {role === "sr" && (
          <>
            {/* ORDER MANAGEMENT */}
            {!isCollapsed && (
              <h3 className="px-4 py-2 text-left uppercase text-xs font-semibold text-gray-400 tracking-wider">
                ORDER MANAGEMENT
              </h3>
            )}
            <div className="ml-0">
              {renderCollapsible(
                ShoppingCart as IconRenderer,
                "Orders",
                srOrderItems,
                "srOrderManagement"
              )}
            </div>

            {/* ✅ WALLET */}
            {!isCollapsed && (
              <h3 className="px-4 py-2 text-left uppercase text-xs font-semibold text-gray-400 tracking-wider">
                WALLET
              </h3>
            )}
            <div className="ml-0">
              {renderCollapsible(
                CreditCard as IconRenderer,
                "Wallet",
                srWalletItems,
                "srWallet"
              )}
            </div>
          </>
        )}

        {/* Admin: আগের মত পুরো মেনু */}
        {role === "admin" && (
          <>
            <div key="product-management" className="space-y-2">
              {!isCollapsed && (
                <h3 className="px-4 py-2 text-left uppercase text-xs font-semibold text-gray-400 tracking-wider transition-opacity duration-200">
                  PRODUCT MANAGEMENT
                </h3>
              )}
              <div className="ml-1">
                {renderCollapsible(
                  Package,
                  "Products",
                  navigationItems.productManagement.slice(0, 3),
                  "productManagement"
                )}
                {renderLink("/admin/category-management", Hash, "Categories")}
                {renderLink("/admin/tag-management", Tag, "Tags")}
                {renderLink("/admin/brand-management", Box, "Brand")}
                {renderLink("/admin/product-attributes", Palette, "Attributes")}
                {renderLink(
                  "/admin/inventory-management",
                  BarChart3,
                  "Inventory"
                )}
              </div>
            </div>

            <div>
              {renderSection(
                "WITHDRAWALS MANAGEMENT",
                navigationItems.WithdrawalsManagement
              )}
            </div>

            <div className="ml-1">
              {renderSection(
                "ORDER MANAGEMENT",
                navigationItems.orderManagement
              )}
            </div>

            <div className="ml-1">
              {renderSection("SETTING", navigationItems.settingManagement)}
            </div>
            <div className="ml-1">
              {renderSection("COURIER MANAGEMENT", navigationItems.courierManagement)}
            </div>

            <div key="user-control-section" className="space-y-2">
              {!isCollapsed && (
                <h3 className="px-4 py-2 text-left uppercase text-xs font-semibold text-gray-400 tracking-wider transition-opacity duration-200">
                  USER CONTROL
                </h3>
              )}
              <div className="ml-1">
                {renderLink("/admin/all-users", Users, "All users")}
              </div>
            </div>
          </>
        )}
      </nav>
    </aside>
  );
}

export default AppSidebar;
