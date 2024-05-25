"use client";

import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Staff, User } from "@prisma/client";
import { CalendarIcon, Pencil, X } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const staffFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  firstDate: z.date(),
  userId: z.string().optional(),
});

interface StaffFormProps {
  onSubmit: (data: z.infer<typeof staffFormSchema>) => void;
  staff?: Staff;
}

export const StaffForm = ({ onSubmit, staff }: StaffFormProps) => {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState(staff?.imageUrl);
  const [editingImage, setEditingImage] = useState(false);
  const [usersOptions, setUsersOpitons] = useState<User[]>([]);

  const form = useForm<z.infer<typeof staffFormSchema>>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      fullName: "",
      userId: staff?.userId || undefined,
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (staff) {
      for (const key in staff) {
        const formKey = key as keyof z.infer<typeof staffFormSchema>;

        if (formKey === "firstDate") {
          form.setValue(formKey, new Date(staff[formKey]));
          continue;
        }

        form.setValue(formKey, staff[formKey] || undefined);
      }
      setImageUrl(staff.imageUrl || null);
      setEditingImage(!!staff.imageUrl);
    }
  }, [form, staff]);

  useEffect(() => {
    try {
      axios.get("/api/users").then((response) => {
        setUsersOpitons(response.data);
      });
    } catch (error) {
      toast.error("Something went wrong");
      router.push("/gym/staff");
    }
  }, [router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <FormField
          control={form.control}
          name="fullName"
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
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
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
                alt="staff image"
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
                    toYear={2222}
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
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose user account" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {usersOptions.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.username} - {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Connect user account (optional)</FormDescription>
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
          <Link href={staff ? `/gym/staff/${staff.id}` : "/gym/staff"}>
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
