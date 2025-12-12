import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/components/admin/data-table';
import { columns } from '@/components/admin/categories/columns';

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, slug, created_at')
    .order('name', { ascending: true });

  if (error) {
    return <p className="text-red-500">Error loading categories: {error.message}</p>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Manage Categories
        </h1>
        <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-900/20">
          <Link href="/admin/categories/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Category
          </Link>
        </Button>
      </div>

      {/* @ts-ignore */}
      <DataTable columns={columns} data={categories || []} searchKey="name" />
    </div>
  );
}
