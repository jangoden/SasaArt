import { createClient } from '@/lib/supabase/server';
import { ProjectForm } from '@/components/admin/project-form';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from('projects')
    .select('id, title, content, soundcloud_url, image_url, category_id, subcategory_id')
    .eq('id', id)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
