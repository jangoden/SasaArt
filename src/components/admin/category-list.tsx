"use client";

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export function CategoryList({ initialCategories }: { initialCategories: Category[] }) {
  const supabase = createClient();
  const [categories, setCategories] = useState(initialCategories);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (categoryId: string) => {
    if (!window.confirm('Are you sure? Deleting a category will also delete its subcategories.')) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (deleteError) throw deleteError;

      setCategories(categories.filter((c) => c.id !== categoryId));

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="border rounded-lg bg-gray-800/50 border-gray-700">
      {error && <p className="text-red-500 p-4">Error: {error}</p>}
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700">
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id} className="border-gray-700">
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/categories/${category.id}/edit`}>Edit</Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
