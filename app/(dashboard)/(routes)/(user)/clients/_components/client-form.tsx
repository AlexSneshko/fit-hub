"use client";

import { z } from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { User } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/app/(dashboard)/_components/avatar";

export const clientFormSchema = z.object({
  userId: z.string(),
});

interface ClientFormProps {
  onSubmit: (data: z.infer<typeof clientFormSchema>) => void;
}

export const ClientForm = ({ onSubmit }: ClientFormProps) => {
  const router = useRouter();
  const { userId } = useAuth();

  const [usersOptions, setUsersOptions] = useState<User[]>([]);

  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    axios
      .get(`/api/users`)
      .then((res) => {
        const users = res.data as User[];

        setUsersOptions(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        router.push("/clients?refresh=true");
        toast.error("Something went wrong");
      });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end gap-x-4"
      >
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {usersOptions.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center gap-x-2">
                        <Avatar avatarUrl={user.imageUrl} imgSize={40} />
                        {user.username}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={/*!isValid ||*/ isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
