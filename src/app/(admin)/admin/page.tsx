import { createClient } from '@/lib/supabase/server';
import { TrendingUp, Activity } from 'lucide-react';
import { DashboardStat } from '@/components/admin/dashboard-stat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch aggregate data
  const { count: projectCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });

  const { count: categoryCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });

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
          value="12.4K"
          icon="Users"
          description="Estimated total engagement"
          colorClassName="from-emerald-500 to-teal-400"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {/* Recent Activity / Projects */}
        <Card className="md:col-span-4 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
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
                      <p className="text-xs text-gray-500">{new Date(project.created_at).toLocaleDateString()}</p>
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

        {/* Quick Actions or Analytics Placeholder */}
        <Card className="md:col-span-3 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-white">Quick Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Storage Usage</span>
                  <span className="text-white font-medium">45%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[45%]" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">API Requests</span>
                  <span className="text-white font-medium">1.2k / 10k</span>
                </div>
                <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 w-[12%]" />
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full border-slate-700 text-gray-300 hover:bg-slate-700 hover:text-white">
                  <Activity className="mr-2 h-4 w-4" /> View System Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
