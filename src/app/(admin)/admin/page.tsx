import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban, Library, Tags, ExternalLink } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function StatCard({ title, value, icon: Icon }: { title: string, value: number, icon: React.ElementType }) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export default async function AdminDashboard() {
  const supabase = createClient();

  // Fetch aggregate data
  const { count: projectCount, error: projectError } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });

  const { count: categoryCount, error: catError } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });
    
  const { count: subcategoryCount, error: subcatError } = await supabase
    .from('subcategories')
    .select('*', { count: 'exact', head: true });

  // Fetch recent projects
  const { data: recentProjects, error: recentProjectsError } = await supabase
    .from('projects')
    .select('id, title, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Projects" value={projectCount || 0} icon={FolderKanban} />
        <StatCard title="Total Categories" value={categoryCount || 0} icon={Library} />
        <StatCard title="Total Subcategories" value={subcategoryCount || 0} icon={Tags} />
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
        <div className="border rounded-lg bg-gray-800/50 border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead>Title</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProjects && recentProjects.length > 0 ? (
                recentProjects.map((project) => (
                  <TableRow key={project.id} className="border-gray-700">
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          Edit <ExternalLink className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center h-24">
                    No projects found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
