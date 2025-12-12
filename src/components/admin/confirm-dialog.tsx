"use client";

import * as React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void | Promise<void>;
    variant?: "danger" | "warning" | "info";
    isLoading?: boolean;
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    variant = "danger",
    isLoading = false,
}: ConfirmDialogProps) {
    const variantStyles = {
        danger: {
            icon: Trash2,
            iconBg: "bg-red-500/20",
            iconColor: "text-red-400",
            button: "bg-red-600 hover:bg-red-700 text-white border-red-700 focus:ring-red-500",
        },
        warning: {
            icon: AlertTriangle,
            iconBg: "bg-amber-500/20",
            iconColor: "text-amber-400",
            button: "bg-amber-600 hover:bg-amber-700 text-white border-amber-700 focus:ring-amber-500",
        },
        info: {
            icon: AlertTriangle,
            iconBg: "bg-blue-500/20",
            iconColor: "text-blue-400",
            button: "bg-blue-600 hover:bg-blue-700 text-white border-blue-700 focus:ring-blue-500",
        },
    };

    const styles = variantStyles[variant];
    const Icon = styles.icon;

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-slate-900 border-slate-700/50 shadow-2xl shadow-black/50 max-w-md">
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 opacity-50 -z-10" />

                <AlertDialogHeader className="space-y-4">
                    {/* Icon with animated pulse */}
                    <div className="flex justify-center">
                        <div className={cn(
                            "relative p-4 rounded-full",
                            styles.iconBg,
                            "animate-in zoom-in-50 duration-300"
                        )}>
                            <div className={cn(
                                "absolute inset-0 rounded-full animate-ping opacity-20",
                                styles.iconBg
                            )} />
                            <Icon className={cn("h-8 w-8", styles.iconColor)} />
                        </div>
                    </div>

                    <AlertDialogTitle className="text-xl font-bold text-center text-white">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-gray-400 text-sm leading-relaxed">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-6 gap-3 sm:gap-3">
                    <AlertDialogCancel
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-gray-300 border-slate-600 transition-all duration-200"
                        disabled={isLoading}
                    >
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        disabled={isLoading}
                        className={cn(
                            "flex-1 transition-all duration-200",
                            styles.button,
                            isLoading && "opacity-70 cursor-not-allowed"
                        )}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            confirmText
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
