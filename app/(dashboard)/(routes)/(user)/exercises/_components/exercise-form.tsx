"use client";

import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Exercise } from "@prisma/client";

export const exerciseFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  restTime: z.string().optional(),
  duration: z.string().optional(),
  weight: z.preprocess(
    (a) =>
      typeof a === "number"
        ? a
        : a
        ? parseFloat(z.string().parse(a))
        : undefined,
    z
      .number()
      .min(0, {
        message: "Weght cant't be less than 0",
      })
      .optional()
  ),
  approachesNumber: z.preprocess(
    (a) =>
      typeof a === "number"
        ? a
        : a
        ? parseInt(z.string().parse(a), 10)
        : undefined,
    z
      .number()
      .int()
      .min(1, {
        message: "Approaches cant't be less than 1",
      })
      .optional()
  ),
  repetitionNumber: z.preprocess(
    (a) =>
      typeof a === "number"
        ? a
        : a
        ? parseInt(z.string().parse(a), 10)
        : undefined,
    z
      .number()
      .int()
      .min(1, {
        message: "Repetitions cant't be less than 1",
      })
      .optional()
  ),
  categoryId: z.string(),
});

interface ExerciseFormProps {
  onSubmit: (values: z.infer<typeof exerciseFormSchema>) => void;
  exercise?: Exercise;
}

export const ExerciseForm = ({ onSubmit, exercise }: ExerciseFormProps) => {
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const router = useRouter();

  let defaultValuesWithoutNulls;
  if (exercise) {
    defaultValuesWithoutNulls = Object.keys(exercise).reduce((acc, key) => {
      const typedKey = key as keyof Exercise;

      if (typedKey === "id" || typedKey === "userId") {
        return acc;
      }

      if (exercise[typedKey] !== null) {
        acc[typedKey] = exercise[typedKey] as never;
      }
      return acc;
    }, {} as z.infer<typeof exerciseFormSchema>);
  }

  const form = useForm<z.infer<typeof exerciseFormSchema>>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      ...defaultValuesWithoutNulls,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onDelete = async () => {
    try {
      await axios.delete(`/api/exercises/${exercise?.id}`);
      toast.success(`Exercise "${exercise?.title}" deleted`);
      router.push("/exercises");
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((response) => {
        setCategoryOptions(response.data);
      })
      .catch((error) => {
        router.push("/exercises");
        toast.error("Something went wrong");
      });
  }, [router]);

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
        <div className="flex gap-x-6">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="time"
                    // step="1"
                    className="w-fit"
                    disabled={isSubmitting}
                    placeholder="e.g. Advaced web development"
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="restTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rest</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="time"
                    // step="1"
                    className="w-fit"
                    disabled={isSubmitting}
                    placeholder="e.g. Advaced web development"
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="md:flex gap-x-6">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="w-fit"
                    disabled={isSubmitting}
                    placeholder="3"
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="approachesNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approaches (times)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="w-fit"
                    disabled={isSubmitting}
                    placeholder="3"
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repetitionNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repetition (times)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    disabled={isSubmitting}
                    placeholder="10"
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an exercise category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Name your training</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-x-2">
          {exercise && (
            // <Link href="/exercises">
            <Button type="button" variant="destructive" onClick={onDelete}>
              Delete
            </Button>
            // </Link>
          )}
          <Link href="/exercises?refresh=true">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={/*!isValid ||*/ isSubmitting}>
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
