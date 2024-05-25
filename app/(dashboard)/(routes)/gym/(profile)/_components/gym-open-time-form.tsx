"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GymOpenTime } from "@prisma/client";

export const gymOpenTimeFormSchema = z.object({
    weekDayOpen: z.string().nullable().optional(),
    weekDayClose: z.string().nullable().optional(),
    saturdayOpen: z.string().nullable().optional(),
    saturdayClose: z.string().nullable().optional(),
    sundayOpen: z.string().nullable().optional(),
    sundayClose: z.string().nullable().optional(),
});

interface GymOpenTimeFormProps {
  onSubmit: (values: z.infer<typeof gymOpenTimeFormSchema>) => void;
  gymOpenTime?: GymOpenTime;
}

export const GymOpenTimeForm = ({
  onSubmit,
  gymOpenTime,
}: GymOpenTimeFormProps) => {
    let defaultValuesWithoutNulls;
    if (gymOpenTime) {
      defaultValuesWithoutNulls = Object.keys(gymOpenTime).reduce((acc, key) => {
        return {
            ...acc,
            [key]: gymOpenTime[key as keyof GymOpenTime] || null,
        }
      }, {} as z.infer<typeof gymOpenTimeFormSchema>);
    }
  
    const form = useForm<z.infer<typeof gymOpenTimeFormSchema>>({
      resolver: zodResolver(gymOpenTimeFormSchema),
      defaultValues: {
        ...defaultValuesWithoutNulls,
      },
    });
  
    const { isSubmitting, isValid } = form.formState;
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center space-y-6">
          <div className="flex gap-x-6">
            <FormField
              control={form.control}
              name="weekDayOpen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekday Open</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      // step="1"
                      className="w-fit"
                      disabled={isSubmitting}
                      placeholder="e.g. Advaced web development"
                      value={field.value ? String(field.value) : undefined}
                    />
                  </FormControl>
                  <FormDescription>Optional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weekDayClose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekday Close</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      // step="1"
                      className="w-fit"
                      disabled={isSubmitting}
                      placeholder="e.g. Advaced web development"
                      value={field.value ? String(field.value) : undefined}
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
              name="saturdayOpen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Saturday Open</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      // step="1"
                      className="w-fit"
                      disabled={isSubmitting}
                      placeholder="e.g. Advaced web development"
                      value={field.value ? String(field.value) : undefined}
                    />
                  </FormControl>
                  <FormDescription>Optional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="saturdayClose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Saturday Close</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      // step="1"
                      className="w-fit"
                      disabled={isSubmitting}
                      placeholder="e.g. Advaced web development"
                      value={field.value ? String(field.value) : undefined}
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
              name="sundayOpen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sunday Open</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      // step="1"
                      className="w-fit"
                      disabled={isSubmitting}
                      placeholder="e.g. Advaced web development"
                      value={field.value ? String(field.value) : undefined}
                    />
                  </FormControl>
                  <FormDescription>Optional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sundayClose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sunday Close</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      // step="1"
                      className="w-fit"
                      disabled={isSubmitting}
                      placeholder="e.g. Advaced web development"
                      value={field.value ? String(field.value) : undefined}
                    />
                  </FormControl>
                  <FormDescription>Optional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end gap-x-2 w-full">
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
    )
}
