"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Equipment } from "@prisma/client";
import { Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { FileUpload } from "@/components/file-upload";
import Image from "next/image";

export const equipmentFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
});

interface EquipmentFormProps {
  onSubmit: (data: z.infer<typeof equipmentFormSchema>) => void;
  equipment?: Equipment;
}

export const EquipmentForm = ({ onSubmit, equipment }: EquipmentFormProps) => {
  const [imageUrl, setImageUrl] = useState(equipment?.imageUrl);
  const [editingImage, setEditingImage] = useState(false);
  
  const form = useForm<z.infer<typeof equipmentFormSchema>>({
    resolver: zodResolver(equipmentFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (equipment) {
      for (const key in equipment) {
        const formKey = key as keyof z.infer<typeof equipmentFormSchema>;

        form.setValue(formKey, equipment[formKey] || undefined);
      }
      setImageUrl(equipment.imageUrl || null);
      setEditingImage(!!equipment.imageUrl);
    }
  }, [form, equipment]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isSubmitting}
                  placeholder="[AAAAAAAAAA] e.g. Advaced web development"
                />
              </FormControl>
              <FormDescription>Think of unique username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!editingImage && (
          <>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="flex gap-x-4 justify-center">
                      <FileUpload
                        endpoint="imageUploader"
                        onChange={(url) => {
                          if (url) {
                            form.setValue("imageUrl", url);
                            setImageUrl(url);
                            setEditingImage(true);
                          }
                        }}
                      />
                      {imageUrl && (
                        <Button
                          variant="outline"
                          onClick={() => setEditingImage(true)}
                          className="mt-2"
                        >
                          <Pencil className="w-4 h-4 mr-2" /> Cancel
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>Think of unique username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {editingImage && imageUrl && (
          <div>
            <h3 className="text-sm mb-0 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Image Preview
            </h3>
            <div className="flex gap-x-4 mt-2 justify-center">
              <Image
                src={imageUrl}
                width={200}
                height={120}
                alt="promotion image"
                className="object-cover"
              />
              <Button variant="outline" onClick={() => setEditingImage(false)}>
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </Button>
            </div>
          </div>
        )}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={7}
                  disabled={isSubmitting}
                  placeholder="[AAAAAAAAAA] e.g. Advaced web development"
                />
              </FormControl>
              <FormDescription>Optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-x-2">
          {/* {user && (
          // <Link href="/exercises">
            <Button type="button" variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          // </Link>
        )} */}
          <Link href={equipment ? `/gym/promotions/${equipment.id}` : "/gym/promotions"}>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
