"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Library,
  Settings,
  ChevronLeft,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/categories", label: "Categories", icon: Library },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActiveRoute = (href: string) => {
    if (href === "/admin") return pathname === href;
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className={cn("flex items-center h-16 px-4 border-b border-white/10", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <Link href="/admin" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            SasaArt CMS
          </Link>
        )}
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1 px-2">
          {adminNavItems.map((item) => {
            const active = isActiveRoute(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  active
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-900/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5",
                  collapsed && "justify-center"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn("h-5 w-5", active ? "text-white" : "text-gray-400 group-hover:text-white", !collapsed && "mr-3")} />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/admin/settings"
          className={cn(
            "flex items-center px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all",
            collapsed && "justify-center"
          )}
        >
          <Settings className={cn("h-5 w-5", !collapsed && "mr-3")} />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:flex flex-col border-r border-white/10 bg-slate-900 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}>
        <SidebarContent />
        <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className={cn("h-3 w-3 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar Trigger - handled in layout usually, but we can expose a trigger here or just use Sheet in header */}
    </>
  );
}

export function MobileSidebar() {
  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    if (href === "/admin") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-gray-400 hover:text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-slate-900 border-slate-800 text-white">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-white/10">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              SasaArt CMS
            </span>
          </div>
          <nav className="flex-1 py-4 px-4 space-y-2">
            {adminNavItems.map((item) => {
              const active = isActiveRoute(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg transition-all",
                    active
                      ? "bg-violet-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
