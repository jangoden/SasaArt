"use client";

import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "./logout-button";
import { MobileSidebar } from "./admin-sidebar";

export function AdminHeader() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/10 bg-slate-900/80 px-4 backdrop-blur md:px-6">
            <div className="flex items-center gap-4">
                <MobileSidebar />
                <div className="relative hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-64 bg-slate-800 border-slate-700 pl-9 text-sm text-white placeholder:text-gray-500 focus:bg-slate-800 focus:ring-violet-600"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-slate-900"></span>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full bg-slate-800 border border-slate-700 text-white hover:bg-slate-700">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-white">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-700" />
                        <DropdownMenuItem className="focus:bg-slate-700 focus:text-white">Settings</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-slate-700 focus:text-white">Support</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-700" />
                        <div className="p-1">
                            <LogoutButton />
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
