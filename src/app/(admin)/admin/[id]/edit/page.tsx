"use client"; // This page needs to be a client component to fetch data on the client side

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ProjectForm } from '@/components/admin/project-form';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setProject(data);
      }
      setLoading(false);
    };

    fetchProject();
  }, [params.id, supabase]);

  if (loading) {
    return <p>Loading project...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      {project && <ProjectForm project={project} />}
    </div>
  );
}
