"use client";

import { z } from "zod";
import Link from "next/link";
import { Gym } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
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
import { FileUpload } from "@/components/file-upload";
import { Avatar } from "@/app/(dashboard)/_components/avatar";

export const gymFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(32, { message: "Username must be less than 32 characters." }),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(32, { message: "Name must be less than 32 characters." }),
  location: z.string().min(3, { message: "Name must be at least 3 characters." }),
  imageUrl: z.string().optional(),
});

interface GymrofileFormProps {
  onSubmit: (values: z.infer<typeof gymFormSchema>) => void;
  gym?: Gym;
}

export const GymForm = ({ onSubmit, gym }: GymrofileFormProps) => {
  const [imageUrl, setImageUrl] = useState(gym?.imageUrl);
  const [previewImage, setPreviewImage] = useState(!!gym?.imageUrl);

  const form = useForm<z.infer<typeof gymFormSchema>>({
    resolver: zodResolver(gymFormSchema),
    defaultValues: {
      username: "",
      name: "",
      location: "",
    },
  });

  useEffect(() => {
    if (gym) {
      for (const key in gym) {
        const formKey = key as keyof z.infer<typeof gymFormSchema>;
        form.setValue(formKey, gym[formKey] || undefined);
      }
    }
  }, [form, gym]);

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {!previewImage && (
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
                            setPreviewImage(true);
                          }
                        }}
                      />
                      {imageUrl && (
                        <Button
                          variant="outline"
                          onClick={() => setPreviewImage(true)}
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
        {previewImage && imageUrl && (
          <div>
            <h3 className="text-sm mb-0 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Image Preview
            </h3>
            <div className="flex gap-x-4 mt-2 justify-center">
              <Avatar avatarUrl={imageUrl} imgSize={128}/>
              <Button variant="outline" onClick={() => setPreviewImage(false)}>
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </Button>
            </div>
          </div>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
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
                  placeholder="e.g. Advaced web development"
                />
              </FormControl>
              <FormDescription>This is your gym name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isSubmitting}
                  placeholder="e.g. Advaced web development"
                />
              </FormControl>
              <FormDescription>This location will be on your profile page</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-x-2">
          {gym && (
            <Link href={`/gym/${gym?.username}`}>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </Link>
          )}
          <Button type="submit" disabled={isSubmitting}>
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
