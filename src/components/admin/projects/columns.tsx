"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ProjectActions } from "./project-actions";

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
        cell: ({ row }) => <ProjectActions project={row.original} />,
    },
];
