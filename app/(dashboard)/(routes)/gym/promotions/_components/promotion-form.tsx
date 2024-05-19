"use client";

import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Promotion } from "@prisma/client";
import { CalendarIcon } from "lucide-react";
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

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { FileUpload } from "@/components/file-upload";
import Image from "next/image";

export const promotionFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  firstDate: z.date(),
  lastDate: z.date(),
  //discount: z.number().min(1, { message: "Discount is required" }),
});

interface PromotionFormProps {
  onSubmit: (data: z.infer<typeof promotionFormSchema>) => void;
  promotion?: Promotion;
}

export const PromotionForm = ({ onSubmit, promotion }: PromotionFormProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof promotionFormSchema>>({
    resolver: zodResolver(promotionFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (promotion) {
      for (const key in promotion) {
        const formKey = key as keyof z.infer<typeof promotionFormSchema>;
        form.setValue(formKey, promotion[formKey] || undefined);
      }
      setImageUrl(promotion.imageUrl || null);
    }
  }, [form, promotion]);

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
        {/* <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>

              </FormControl>
              <FormDescription>Think of unique username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FileUpload
          endpoint="imageUploader"
          onChange={(url) => {
            if (url) {
              form.setValue("imageUrl", url);
              setImageUrl(url);
            }
          }}
        />
        {imageUrl && (
          <div className="w-32 h-32 relative">
            <Image
              src={imageUrl}
              alt="promotion image"
              className="w-full h-full object-cover"
            />
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
                  disabled={isSubmitting}
                  placeholder="[AAAAAAAAAA] e.g. Advaced web development"
                />
              </FormControl>
              <FormDescription>Optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>First date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    defaultMonth={field.value}
                    selected={field.value}
                    onSelect={field.onChange}
                    fixedWeeks
                    fromDate={new Date(1900, 0, 1)}
                    // toDate={new Date(3000, 0, 0)}
                    toYear={2040}
                    captionLayout="dropdown-buttons"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Last date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    defaultMonth={field.value}
                    selected={field.value}
                    onSelect={field.onChange}
                    fixedWeeks
                    weekStartsOn={1}
                    fromDate={new Date(1900, 0, 1)}
                    toDate={new Date()}
                    captionLayout="dropdown-buttons"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
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
          {promotion && (
            <Link href="/gym/promotions">
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
