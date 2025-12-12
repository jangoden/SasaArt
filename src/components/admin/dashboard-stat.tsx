"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FolderKanban, Library, Tags, Users, LucideIcon } from "lucide-react";

// Icon mapping to avoid passing React components from Server to Client
const iconMap: Record<string, LucideIcon> = {
    FolderKanban,
    Library,
    Tags,
    Users,
};

interface DashboardStatProps {
    title: string;
    value: string | number;
    icon: keyof typeof iconMap;
    description?: string;
    trend?: {
        value: number;
        label: string;
    };
    colorClassName?: string;
}

export function DashboardStat({
    title,
    value,
    icon,
    description,
    trend,
    colorClassName = "from-violet-500 to-purple-600",
}: DashboardStatProps) {
    const Icon = iconMap[icon] || FolderKanban;
    return (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/80 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">
                    {title}
                </CardTitle>
                <div className={cn("p-2 rounded-lg bg-gradient-to-br shadow-lg", colorClassName)}>
                    <Icon className="h-4 w-4 text-white" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                {(description || trend) && (
                    <div className="flex items-center text-xs text-gray-500">
                        {trend && (
                            <span className={cn("font-medium mr-2", trend.value >= 0 ? "text-emerald-400" : "text-rose-400")}>
                                {trend.value > 0 ? "+" : ""}{trend.value}%
                            </span>
                        )}
                        {description && <span>{description}</span>}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
