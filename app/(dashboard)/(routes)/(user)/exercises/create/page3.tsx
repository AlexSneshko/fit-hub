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
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  restTime: z.string().optional(),
  duration: z.string().optional(),
  weight: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z
      .number()
      .int()
      .positive()
      .min(1, {
        message: "Weght cant't be less than 1",
      })
      .optional()
  ),
  approachesNumber: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z
      .number()
      .int()
      .positive()
      .min(1, {
        message: "Approaches cant't be less than 1",
      })
      .optional()
  ),
  repetitionNumber: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z
      .number()
      .int()
      .positive()
      .min(1, {
        message: "Repetitions cant't be less than 1",
      })
      .optional()
  ),
  categoryId: z.string(),
});

const CrateExercisePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("first");
    try {
      const response = await axios.post("/api/exercises", values);
      router.push(`/exercises/${response.data.id}`);
      toast.success("Exercise created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:items-center md:justify-center h-full mt-20 pb-20 px-6">
      <div>
      <h1 className="text-2xl">Name your exercise</h1>
      <p className="text-sm text-slate-600">
        What would you like to tell about your exercise? Don&apos;t worry, you
        can change this later.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <div className="flex gap-x-6">
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
            {/* <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
            /> */}
          <button type="submit">Submit</button>
        </form>
      </Form>
      </div>
    </div>
  );
};

export default CrateExercisePage;
