"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Validation schema
const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface Category {
    id?: string;
    name: string;
    slug: string;
}

export function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: category || { name: '', slug: ''},
  });

  const onSubmit = async (data: CategoryFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const { error: upsertError } = await supabase
        .from('categories')
        .upsert(category ? { id: category.id, ...data } : data);

      if (upsertError) throw upsertError;

      router.push('/admin/categories');
      router.refresh();

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{category ? "Edit Category" : "Create New Category"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input id="name" {...register("name")} className="bg-gray-700 border-gray-600" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="slug">Category Slug</Label>
            <Input id="slug" {...register("slug")} placeholder="e.g., fine-art" className="bg-gray-700 border-gray-600" />
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Category'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
