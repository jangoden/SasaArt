"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Validation schema
const subcategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  category_id: z.string().uuid("Please select a parent category"),
});

type SubcategoryFormValues = z.infer<typeof subcategorySchema>;

interface Category {
  id: string;
  name: string;
}

interface Subcategory {
    id?: string;
    name: string;
    slug: string;
    category_id: string;
}

export function SubcategoryForm({ subcategory }: { subcategory?: Subcategory }) {
  const router = useRouter();
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SubcategoryFormValues>({
    resolver: zodResolver(subcategorySchema),
    defaultValues: subcategory || { name: '', slug: '', category_id: '' },
  });

  useEffect(() => {
    // Fetch categories for the dropdown
    const fetchCategories = async () => {
      const { data: cats, error: catError } = await supabase.from("categories").select("id, name");
      if (cats) setCategories(cats);
    };
    fetchCategories();
  }, [supabase]);

  const onSubmit = async (data: SubcategoryFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const { error: upsertError } = await supabase
        .from('subcategories')
        .upsert(subcategory ? { id: subcategory.id, ...data } : data);

      if (upsertError) throw upsertError;

      router.push('/admin/subcategories');
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
        <CardTitle>{subcategory ? "Edit Subcategory" : "Create New Subcategory"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Parent Category */}
          <div>
            <Label>Parent Category</Label>
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select a parent category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>}
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">Subcategory Name</Label>
            <Input id="name" {...register("name")} className="bg-gray-700 border-gray-600" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor="slug">Subcategory Slug</Label>
            <Input id="slug" {...register("slug")} placeholder="e.g., original-songs" className="bg-gray-700 border-gray-600" />
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Subcategory'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
