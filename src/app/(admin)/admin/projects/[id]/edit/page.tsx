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
        .select('id, title, content, music_url, image_url, category_id')
        .eq('id', id)
        .single();

    if (error || !project) {
        notFound();
    }

    // Transform to match ProjectForm expected props
    const projectData = {
        id: project.id,
        title: project.title,
        content: project.content,
        music_url: project.music_url,
        image_url: project.image_url,
        category_id: project.category_id,
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Edit Project
                </h1>
                <p className="text-gray-400 mt-1">Update the project details below.</p>
            </div>
            <ProjectForm project={projectData} />
        </div>
    );
}
