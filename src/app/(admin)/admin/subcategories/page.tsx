import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { SubcategoryList } from '@/components/admin/subcategory-list'; // We will create this client component

export const revalidate = 0;

export default async function AdminSubcategoriesPage() {
  const supabase = createClient();
  // We need to join with the categories table to display the parent category name
  const { data: subcategories, error } = await supabase
    .from('subcategories')
    .select(`
      id,
      name,
      slug,
      created_at,
      categories ( name )
    `)
    .order('name', { ascending: true });

  if (error) {
    return <p className="text-red-500">Error loading subcategories: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Subcategories</h1>
        <Button asChild>
          <Link href="/admin/subcategories/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Subcategory
          </Link>
        </Button>
      </div>
      
      <SubcategoryList initialSubcategories={subcategories || []} />
    </div>
  );
}
