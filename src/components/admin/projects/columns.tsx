"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Use a type that matches the Supabase query result
export type ProjectColumn = {
    id: string;
    title: string;
    created_at: string;
    image_url?: string | null;
    categories: { name: string } | { name: string }[] | null;
};

export const columns: ColumnDef<ProjectColumn>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-gray-400 hover:text-white pl-0"
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="font-medium text-white">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "categories",
        header: "Category",
        cell: ({ row }) => {
            const cat = row.original.categories;
            const name = Array.isArray(cat) ? cat[0]?.name : cat?.name;
            return <div className="text-gray-300">{name || '-'}</div>
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-gray-400 hover:text-white"
                >
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-gray-400">{new Date(row.getValue("created_at")).toLocaleDateString()}</div>,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const project = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-gray-200">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(project.id)}
                            className="focus:bg-slate-700 focus:text-white"
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-700" />
                        <DropdownMenuItem asChild className="focus:bg-slate-700 focus:text-white">
                            <Link href={`/admin/projects/${project.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
