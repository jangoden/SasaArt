import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { CategoryList } from '@/components/admin/category-list'; // We will create this client component

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const supabase = createClient();
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, slug, created_at')
    .order('name', { ascending: true });

  if (error) {
    return <p className="text-red-500">Error loading categories: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <Button asChild>
          <Link href="/admin/categories/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Category
          </Link>
        </Button>
      </div>
      
      <CategoryList initialCategories={categories || []} />
    </div>
  );
}
