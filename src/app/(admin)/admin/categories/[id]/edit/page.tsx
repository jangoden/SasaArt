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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Edit Category
        </h1>
        <p className="text-gray-400 mt-1">Update category details below.</p>
      </div>
      <CategoryForm category={category} />
    </div>
  );
}

