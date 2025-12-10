"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Palette, Mic, Book, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileCard } from "../profile-card";
import { SocialLinks } from "../social-links";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/art", label: "Art", icon: Palette },
  { href: "/music", label: "Music", icon: Mic },
  { href: "/literature", label: "Literature", icon: Book },
  { href: "/architecture", label: "Architecture", icon: Building2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 h-full p-4 flex flex-col gap-4 overflow-y-auto">
      {/* Profile Card */}
      <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
        <ProfileCard />
      </div>

      {/* Navigation Card */}
      <div className="flex-grow p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg flex flex-col">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl text-white/80 transition-all duration-300",
                  isActive
                    ? "bg-white/20 shadow-inner"
                    : "hover:bg-white/10"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Social Links Card */}
      <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
          <h2 className="text-xl font-headline text-white font-bold mb-4 text-center">
            Connect
          </h2>
          <SocialLinks />
      </div>
    </aside>
  );
}
