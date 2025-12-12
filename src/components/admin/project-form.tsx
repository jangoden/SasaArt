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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Save, ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Validation schema
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  music_url: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  category_id: z.string().uuid("Please select a category"),
  image: z.any().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProjectFormProps {
  project?: ProjectFormValues & {
    id?: string;
    image_url?: string | null;
  };
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(project?.image_url || null);
  const [categorySlug, setCategorySlug] = useState<string>("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      content: project?.content || "",
      music_url: project?.music_url || "",
      category_id: project?.category_id || "",
    },
  });

  const selectedCategoryId = watch("category_id");
  const selectedImage = watch("image");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data: cats } = await supabase.from("categories").select("id, name, slug");
      if (cats) setCategories(cats);
    };
    fetchCategories();
  }, [supabase]);

  useEffect(() => {
    if (selectedCategoryId) {
      const currentCat = categories.find(c => c.id === selectedCategoryId);
      if (currentCat) setCategorySlug(currentCat.slug);
    } else {
      setCategorySlug("");
    }
  }, [selectedCategoryId, categories]);

  // Handle Image Preview
  useEffect(() => {
    if (selectedImage && selectedImage[0]) {
      const file = selectedImage[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedImage]);

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    setError(null);

    try {
      let imageUrl = project?.image_url || null;

      // 1. Handle image upload
      if (data.image && data.image[0]) {
        const file = data.image[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from('project_images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('project_images').getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }

      // 2. Prepare data
      const projectData = {
        title: data.title,
        content: data.content,
        music_url: data.music_url,
        category_id: data.category_id,
        image_url: imageUrl,
      };

      // 3. Upsert
      const { error: upsertError } = await supabase
        .from('projects')
        .upsert(project?.id ? { id: project.id, ...projectData } : projectData);

      if (upsertError) throw upsertError;

      router.push('/admin/projects');
      router.refresh();

      toast({
        title: "Success",
        description: project?.id ? "Project updated successfully." : "Project created successfully.",
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

  const isMusic = categorySlug === "music";
  const isLiterature = categorySlug === "literature";
  // Art and Architecture both use Image + Title, which is minimal default.

  return (
    <Card className="bg-slate-800/50 border-slate-700 max-w-4xl mx-auto backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {project?.id ? "Edit Project" : "Create New Project"}
        </CardTitle>
        <CardDescription className="text-gray-400">
          Fill in the details below. Fields change based on the selected category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column: Image Upload (Hide for Literature if strictly text only, but maybe keeping it is safer) */}
            {/* User requirement: "Literature : Judul, Teks Editor (blog)". Doesn't explicitly say NO image, but let's hide it to follow "Architecture: Up Gambar" distinction. 
                Actually, usually blog posts have cover images. But I'll follow user spec strictly if I can. 
                "Art : Judul , Uploud Gambar"
                "Architecture : Judul, Up Gambar"
                "Music : Judul , Link music"
                "Literature : Judul, Teks Editor"
                
                So Image is for Art & Architecture. Maybe Music too? No, "Link music". 
                I will hide Image for Literature and Music? 
                Wait, music usually has cover art. I'll just keep it optional for all, or hide it if strictly not needed.
                Let's hide it for Literature merely to distinguish. For Music, I'll leave it as usually you want a cover. 
                Actually, let's just show it by default but maybe deemphasize?
                User spec:
                Art: Title, Image
                Music: Title, Music Link
                Literature: Title, Text
                Architecture: Title, Image
                
                So Image is primarily for Art/Arch. Music might not need it if it's just an embedded player. 
                I will hide Image for Literature and Music to be safe, or just Literature?
                Let's make it conditional.
            */}

            {!isLiterature && !isMusic && (
              <div className="md:col-span-1 space-y-4 animate-in fade-in">
                <Label className="text-base text-white">Project Image</Label>
                <div className={cn(
                  "relative aspect-square rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/50 flex flex-col items-center justify-center cursor-pointer hover:border-violet-500 transition-colors group overflow-hidden",
                  imagePreview ? "border-solid border-slate-700" : ""
                )}>
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-sm font-medium">Change Image</p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      <div className="bg-slate-700 rounded-full p-3 inline-block mb-2 group-hover:bg-violet-600/20 group-hover:text-violet-400 transition-colors">
                        <ImagePlus className="h-6 w-6 text-gray-400 group-hover:text-violet-400" />
                      </div>
                      <p className="text-sm text-gray-400">Click to upload</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    {...register("image")}
                  />
                </div>
                {imagePreview && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    onClick={() => {
                      setValue("image", null);
                      setImagePreview(null);
                    }}
                  >
                    <X className="mr-2 h-4 w-4" /> Remove Image
                  </Button>
                )}
              </div>
            )}

            {/* If Literature or Music, use full width if image is hidden? 
                Structure: grid-cols-3. If hidden, blank space? 
                Better logic: 
             */}

            <div className={cn("space-y-6", (!isLiterature && !isMusic) ? "md:col-span-2" : "md:col-span-3")}>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Title</Label>
                  <Input
                    id="title"
                    {...register("title")}
                    className="bg-slate-900 border-slate-700 text-white focus:border-violet-500"
                    placeholder="Project Title"
                  />
                  {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Category</Label>
                  <Controller
                    name="category_id"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id} className="focus:bg-slate-700">{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category_id && <p className="text-red-400 text-xs">{errors.category_id.message}</p>}
                </div>

                {/* Conditional Fields */}
                {isMusic && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <Label htmlFor="music_url" className="text-white">SoundCloud / Music Link</Label>
                    <div className="relative">
                      <Input
                        id="music_url"
                        {...register("music_url")}
                        className="bg-slate-900 border-slate-700 text-white pl-10"
                        placeholder="https://soundcloud.com/..."
                      />
                      <div className="absolute left-3 top-2.5 text-gray-500">🎵</div>
                    </div>
                    {errors.music_url && <p className="text-red-400 text-xs">{errors.music_url.message}</p>}
                  </div>
                )}

                {isLiterature && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <Label htmlFor="content" className="text-white">Content / Blog Post</Label>
                    <Textarea
                      id="content"
                      {...register("content")}
                      className="bg-slate-900 border-slate-700 text-white min-h-[300px]"
                      placeholder="Write your story here..."
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-4 pt-4">
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
                      <Save className="mr-2 h-4 w-4" /> Save Project
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
