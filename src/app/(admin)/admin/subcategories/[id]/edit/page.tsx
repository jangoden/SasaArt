"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { SubcategoryForm } from '@/components/admin/subcategory-form';

export default function EditSubcategoryPage({ params }: { params: { id: string } }) {
  const [subcategory, setSubcategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchSubcategory = async () => {
      const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setSubcategory(data);
      }
      setLoading(false);
    };

    fetchSubcategory();
  }, [params.id, supabase]);

  if (loading) {
    return <p>Loading subcategory...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      {subcategory && <SubcategoryForm subcategory={subcategory} />}
    </div>
  );
}
