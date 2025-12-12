"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export type CategoryColumn = {
    id: string;
    name: string;
    slug: string;
    created_at: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-gray-400 hover:text-white pl-0"
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="font-medium text-white">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "slug",
        header: "Slug",
        cell: ({ row }) => <div className="text-gray-400 font-mono text-xs">{row.getValue("slug")}</div>,
    },
    {
        accessorKey: "created_at",
        header: "Created",
        cell: ({ row }) => <div className="text-gray-400 text-xs">{new Date(row.getValue("created_at")).toLocaleDateString()}</div>,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const category = row.original;

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
                        <DropdownMenuItem asChild className="focus:bg-slate-700 focus:text-white">
                            <Link href={`/admin/categories/${category.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                        {/* Add Delete action if needed, using a Dialog usually */}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
