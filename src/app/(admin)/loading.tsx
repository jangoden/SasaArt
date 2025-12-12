import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-48 bg-slate-800" />
                <Skeleton className="h-10 w-32 bg-slate-800" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="bg-slate-800/50 border-slate-700">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-20 bg-slate-700" />
                            <Skeleton className="h-4 w-4 rounded-full bg-slate-700" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-12 bg-slate-700 mb-2" />
                            <Skeleton className="h-3 w-24 bg-slate-700" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                    <Skeleton className="h-6 w-32 bg-slate-700" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-slate-700">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-10 w-10 rounded-full bg-slate-700" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-40 bg-slate-700" />
                                        <Skeleton className="h-3 w-24 bg-slate-700" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
