import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { DataTable } from '@/components/admin/data-table';
import { columns } from '@/components/admin/projects/columns';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
        id, 
        title, 
        created_at, 
        image_url,
        categories ( name )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    return <p className="text-red-500">Error loading projects: {error.message}</p>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Manage Projects
        </h1>
        <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-900/20">
          <Link href="/admin/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      {/* @ts-ignore */}
      <DataTable columns={columns} data={projects || []} searchKey="title" />
    </div>
  );
}
