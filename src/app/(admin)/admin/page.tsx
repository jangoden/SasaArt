import { createClient } from '@/lib/supabase/server';
import { TrendingUp, Activity } from 'lucide-react';
import { DashboardStat } from '@/components/admin/dashboard-stat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';

export const revalidate = 0;

function formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch aggregate data
  const { count: projectCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });

  const { count: categoryCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });

  const { data: viewsData, error: viewsError } = await supabase
    .from('projects')
    .select('views');

  const totalViews = viewsData?.reduce((acc, project) => acc + (project.views || 0), 0) || 0;

  // Fetch recent projects
  const { data: recentProjects } = await supabase
    .from('projects')
    .select('id, title, created_at, categories(name)')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Dashboard</h1>
          <p className="text-gray-400 mt-1">Overview of your creative portfolio.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-900/20">
            <Link href="/admin/projects/new">Create Project</Link>
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardStat
          title="Total Projects"
          value={projectCount || 0}
          icon="FolderKanban"
          description="+2 from last month"
          trend={{ value: 12, label: 'up' }}
          colorClassName="from-blue-500 to-cyan-400"
        />
        <DashboardStat
          title="Categories"
          value={categoryCount || 0}
          icon="Library"
          colorClassName="from-violet-500 to-purple-500"
        />
        <DashboardStat
          title="Total Views"
          value={formatNumber(totalViews)}
          icon="Users"
          description="Live project engagement"
          colorClassName="from-emerald-500 to-teal-400"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {/* Recent Activity / Projects */}
        <Card className="md:col-span-full bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-white">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects?.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-slate-700">
                      <TrendingUp className="h-4 w-4 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{project.title}</p>
                      <p className="text-xs text-gray-500">{format(new Date(project.created_at), 'PP')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-xs font-semibold text-violet-400">
                      {/* @ts-ignore */}
                      {project.categories?.name || (Array.isArray(project.categories) && project.categories[0]?.name)}
                    </span>
                  </div>
                </div>
              ))}
              {(!recentProjects || recentProjects.length === 0) && (
                <p className="text-center text-gray-500 py-8">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>


      </div>
    </div>
  );
}
