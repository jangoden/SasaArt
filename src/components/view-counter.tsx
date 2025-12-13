"use client";

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function ViewCounter({ projectId }: { projectId: string }) {
  useEffect(() => {
    const supabase = createClient();
    
    const incrementView = async () => {
      try {
        const { error } = await supabase.rpc('increment_project_views', {
          project_id_to_update: projectId,
        });
        if (error) {
          console.error('Error incrementing view count:', error);
        }
      } catch (error) {
        console.error('An unexpected error occurred while incrementing view count:', error);
      }
    };

    if (projectId) {
      incrementView();
    }
  }, [projectId]);

  return null; // This component does not render anything
}
