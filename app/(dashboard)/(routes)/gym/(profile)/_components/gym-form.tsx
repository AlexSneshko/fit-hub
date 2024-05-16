"use client";

import { z } from "zod";
import Link from "next/link";
import { Gym } from "@prisma/client";
import { useForm } from "react-hook-form";
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
});

interface GymrofileFormProps {
  onSubmit: (values: z.infer<typeof gymFormSchema>) => void;
  gym?: Gym;
}

export const GymForm = ({ onSubmit, gym }: GymrofileFormProps) => {
  const form = useForm<z.infer<typeof gymFormSchema>>({
    resolver: zodResolver(gymFormSchema),
    defaultValues: {
      username: "",
      name: "",
      location: "",
    },
  });

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8 w-full">
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
          {/* {user && (
            // <Link href="/exercises">
              <Button type="button" variant="destructive" onClick={onDelete}>
                Delete
              </Button>
            // </Link>
          )} */}
          {gym && (
            <Link href={`/gym/${gym?.id}`}>
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
