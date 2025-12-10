"use client";

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categories: { name: string } | null;
}

export function SubcategoryList({ initialSubcategories }: { initialSubcategories: Subcategory[] }) {
  const supabase = createClient();
  const [subcategories, setSubcategories] = useState(initialSubcategories);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (subcategoryId: string) => {
    if (!window.confirm('Are you sure you want to delete this subcategory?')) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from('subcategories')
        .delete()
        .eq('id', subcategoryId);

      if (deleteError) throw deleteError;

      setSubcategories(subcategories.filter((s) => s.id !== subcategoryId));

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
            <TableHead>Parent Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subcategories.map((subcategory) => (
            <TableRow key={subcategory.id} className="border-gray-700">
              <TableCell className="font-medium">{subcategory.name}</TableCell>
              <TableCell>{subcategory.slug}</TableCell>
              <TableCell>{subcategory.categories?.name || 'N/A'}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/subcategories/${subcategory.id}/edit`}>Edit</Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(subcategory.id)}
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
