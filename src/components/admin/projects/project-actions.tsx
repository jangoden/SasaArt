"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { ProjectColumn } from "./columns";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

interface ProjectActionsProps {
    project: ProjectColumn;
}

export function ProjectActions({ project }: ProjectActionsProps) {
    const router = useRouter();
    const supabase = createClient();
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            // 1. Delete image from storage if it exists
            if (project.image_url) {
                let filePath = project.image_url;

                // If it's a full URL, extract the file path
                if (project.image_url.startsWith('http://') || project.image_url.startsWith('https://')) {
                    try {
                        const pathSegments = new URL(project.image_url).pathname.split('/');
                        const bucketIndex = pathSegments.indexOf('project_images');
                        if (bucketIndex !== -1) {
                            filePath = pathSegments.slice(bucketIndex + 1).join('/');
                        }
                    } catch (urlError) {
                        console.warn("Could not parse URL, using as filename:", project.image_url);
                    }
                }

                if (filePath) {
                    const { error: storageError } = await supabase.storage
                        .from('project_images')
                        .remove([filePath]);

                    if (storageError) {
                        console.error("Could not delete image from storage:", storageError.message);
                    }
                }
            }

            // 2. Delete from projects table
            const { error: dbError } = await supabase
                .from('projects')
                .delete()
                .eq('id', project.id);

            if (dbError) throw dbError;

            toast({
                title: "✅ Project Deleted",
                description: `"${project.title}" has been successfully removed.`,
                className: "bg-slate-800 border-green-500/50 text-white",
            });

            setShowDeleteDialog(false);
            router.refresh();

        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error Deleting Project",
                description: error.message,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-slate-700/50 transition-colors">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="bg-slate-800 border-slate-700 text-gray-200 shadow-xl shadow-black/20 min-w-[160px]"
                >
                    <DropdownMenuLabel className="text-gray-400 font-normal text-xs uppercase tracking-wider">
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem asChild className="focus:bg-slate-700 focus:text-white cursor-pointer">
                        <Link href={`/admin/projects/${project.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Project
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="focus:bg-red-900/50 focus:text-red-400 text-red-400 cursor-pointer"
                        onClick={() => setShowDeleteDialog(true)}
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Project
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                title="Delete Project?"
                description={`Are you sure you want to delete "${project.title}"? This action cannot be undone and will permanently remove the project and its associated files.`}
                confirmText="Delete"
                cancelText="Keep it"
                variant="danger"
                isLoading={isDeleting}
                onConfirm={handleDelete}
            />
        </>
    );
}
