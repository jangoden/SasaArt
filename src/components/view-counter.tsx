"use client";

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function ViewCounter({ projectId }: { projectId: string }) {
  useEffect(() => {
    const supabase = createClient();
    
    const incrementView = async () => {
      await supabase.rpc('increment_project_views', {
        project_id_to_update: projectId,
      });
    };

    if (projectId) {
      incrementView();
    }
  }, [projectId]);

  return null; // This component does not render anything
}
