"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CategoryForm } from '@/components/admin/category-form';

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchCategory = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setCategory(data);
      }
      setLoading(false);
    };

    fetchCategory();
  }, [params.id, supabase]);

  if (loading) {
    return <p>Loading category...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      {category && <CategoryForm category={category} />}
    </div>
  );
}
