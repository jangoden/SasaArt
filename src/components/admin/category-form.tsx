"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Validation schema
const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
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
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: category || { name: '', slug: '' },
  });

  const nameValue = watch("name");

  // Auto-generate slug from name
  useEffect(() => {
    if (!category && nameValue && !touchedFields.slug) {
      const slug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue("slug", slug);
    }
  }, [nameValue, category, touchedFields.slug, setValue]);

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

      toast({
        title: "Success",
        description: category ? "Category updated." : "Category created.",
        className: "bg-green-600 border-green-700 text-white",
      });

    } catch (error: any) {
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 max-w-lg mx-auto backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {category ? "Edit Category" : "Create New Category"}
        </CardTitle>
        <CardDescription className="text-gray-400">
          Define broad categories for your portfolio (e.g. Art, Music).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Category Name</Label>
            <Input
              id="name"
              {...register("name")}
              className="bg-slate-900 border-slate-700 text-white focus:border-violet-500"
              placeholder="e.g. Fine Art"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="text-white">URL Slug</Label>
            <Input
              id="slug"
              {...register("slug")}
              className="bg-slate-900 border-slate-700 text-white font-mono text-sm focus:border-violet-500"
              placeholder="e.g. fine-art"
            />
            {errors.slug && <p className="text-red-400 text-xs mt-1">{errors.slug.message}</p>}
            <p className="text-xs text-gray-500">The URL-friendly version of the name.</p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => router.back()} className="border-slate-700 text-gray-400 hover:text-white hover:bg-slate-700">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-violet-600 hover:bg-violet-700 text-white min-w-[120px]">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Category
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
