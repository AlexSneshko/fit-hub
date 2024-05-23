"use client";

import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { Training } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const trainingInfoFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().optional(),
  isPublic: z.boolean(),
});

interface TrainingFormProps {
  onSubmit: (values: z.infer<typeof trainingInfoFormSchema>) => void;
  training?: Training;
}

export const TrainingInfoForm = ({ onSubmit, training }: TrainingFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof trainingInfoFormSchema>>({
    resolver: zodResolver(trainingInfoFormSchema),
    defaultValues: {
      isPublic: false,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onDelete = async () => {
    try {
      await axios.delete(`/api/traingings/${training?.id}`);
      toast.success(`Exercise "${training?.title}" deleted`);
      router.push("/exercises?refresh=true");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (training) {
      for (const key in training) {
        const formKey = key as keyof z.infer<typeof trainingInfoFormSchema>;
        form.setValue(formKey, training[formKey] || undefined);
      }
    }
  }, [form, training]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isSubmitting}
                  placeholder="[AAAAAAAAAA] e.g. Advaced web development"
                />
              </FormControl>
              <FormDescription>Name your exercise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isSubmitting}
                  placeholder="[AAAAAAAAAA] e.g. Advaced web development"
                />
              </FormControl>
              <FormDescription>What would you train?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Public</FormLabel>
                <FormDescription>
                  You can make your training public, other users will be able to
                  see it on your profile.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-x-2">
          {!training && (
            <Link href="/trainings?refresh=true">
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
