"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export function MobileHeader() {
  return (
    <header className="lg:hidden sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-white/10">
                <AvatarImage
                    src="/images/foto-profil.webp"
                    alt="Profile Picture"
                    className="object-cover"
                />
                <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold font-headline text-pink-400">
                Lunea Arte
            </span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-sm p-0 bg-transparent border-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
