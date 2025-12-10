import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ProjectList } from '@/components/admin/project-list';

export const revalidate = 0; // Make this page dynamic

export default async function AdminProjectsPage() {
  const supabase = createClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, title, created_at, image_url')
    .order('created_at', { ascending: false });

  if (error) {
    return <p className="text-red-500">Error loading projects: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Button asChild>
          <Link href="/admin/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>
      
      <ProjectList initialProjects={projects || []} />
    </div>
  );
}
