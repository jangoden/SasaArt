"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Validation schema
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  soundcloud_url: z.string().url().optional().or(z.literal('')),
  category_id: z.string().uuid("Please select a category"),
  subcategory_id: z.string().uuid("Please select a subcategory").optional(),
  image: z.any().optional(), // For file upload
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface Category {
  id: string;
  name: string;
}

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

export function ProjectForm({ project }: { project?: ProjectFormValues & { id?: string } }) {
  const router = useRouter();
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: project || {},
  });

  const selectedCategoryId = watch("category_id");

  useEffect(() => {
    // Fetch categories and subcategories
    const fetchData = async () => {
      const { data: cats, error: catError } = await supabase.from("categories").select("id, name");
      if (cats) setCategories(cats);

      const { data: subcats, error: subcatError } = await supabase.from("subcategories").select("id, name, category_id");
      if (subcats) setSubcategories(subcats);
    };
    fetchData();
  }, [supabase]);

  useEffect(() => {
    // Filter subcategories based on selected category
    if (selectedCategoryId) {
      setFilteredSubcategories(
        subcategories.filter((sub) => sub.category_id === selectedCategoryId)
      );
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedCategoryId, subcategories]);

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    setError(null);

    try {
      let imageUrl = project?.image_url || null;

      // 1. Handle image upload
      if (data.image && data.image[0]) {
        const file = data.image[0];
        const filePath = `public/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('project_images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('project_images').getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }

      // 2. Prepare data for insertion/update
      const projectData = {
        title: data.title,
        content: data.content,
        soundcloud_url: data.soundcloud_url,
        category_id: data.category_id,
        subcategory_id: data.subcategory_id,
        image_url: imageUrl,
      };

      // 3. Upsert data (update if project exists, insert if not)
      const { error: upsertError } = await supabase
        .from('projects')
        .upsert(project ? { id: project.id, ...projectData } : projectData);

      if (upsertError) throw upsertError;

      // 4. Redirect on success
      router.push('/admin');
      router.refresh();

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle>{project ? "Edit Project" : "Create New Project"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} className="bg-gray-700 border-gray-600" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content">Content (for Literature)</Label>
            <Textarea id="content" {...register("content")} className="bg-gray-700 border-gray-600" />
          </div>

          {/* SoundCloud URL */}
          <div>
            <Label htmlFor="soundcloud_url">SoundCloud URL (for Music)</Label>
            <Input id="soundcloud_url" {...register("soundcloud_url")} className="bg-gray-700 border-gray-600" />
            {errors.soundcloud_url && <p className="text-red-500 text-sm mt-1">{errors.soundcloud_url.message}</p>}
          </div>
          
          {/* Image Upload */}
          <div>
            <Label htmlFor="image">Image (for Art, Architecture, Literature)</Label>
            <Input id="image" type="file" {...register("image")} className="bg-gray-700 border-gray-600 file:text-white" />
          </div>

          {/* Category */}
          <div>
            <Label>Category</Label>
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select a category" />
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

          {/* Subcategory */}
          <div>
            <Label>Subcategory</Label>
            <Controller
              name="subcategory_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={filteredSubcategories.length === 0}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select a subcategory (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredSubcategories.map((sub) => (
                      <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Project'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
