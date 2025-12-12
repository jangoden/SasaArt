import { createClient } from '@/lib/supabase/server';
import { CategoryForm } from '@/components/admin/category-form';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: category, error } = await supabase
    .from('categories')
    .select('id, name, slug')
    .eq('id', id)
    .single();

  if (error || !category) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  );
}
