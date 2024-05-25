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
  FormDescription,
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
import { TrainerWithUser } from "@/types/trainer";
import { Input } from "@/components/ui/input";

export const gymTrainerFormSchema = z.object({
  trainerId: z.string(),
  role: z.string().min(1, { message: "Role is required" }),
});

interface ClientFormProps {
  onSubmit: (data: z.infer<typeof gymTrainerFormSchema>) => void;
}

export const GymTrainerForm = ({ onSubmit }: ClientFormProps) => {
  const router = useRouter();
  const { userId } = useAuth();

  const [trainersOptions, setTrainersOptions] = useState<User[]>([]);

  const form = useForm<z.infer<typeof gymTrainerFormSchema>>({
    resolver: zodResolver(gymTrainerFormSchema),
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    axios
      .get(`/api/trainers`)
      .then((res) => {
        console.log(res.data)

        const trainers = res.data as TrainerWithUser[];
        const users = trainers.map(({ user }) => user);

        setTrainersOptions(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        router.refresh();
        toast.error("Something went wrong");
      });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="items-end gap-x-4"
      >
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
        <FormField
          control={form.control}
          name="trainerId"
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
                  {trainersOptions.map((trainer) => (
                    <SelectItem key={trainer.id} value={trainer.id}>
                      <div className="flex items-center gap-x-2">
                        <Avatar avatarUrl={trainer.imageUrl} imgSize={40} />
                        {trainer.username}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={/*!isValid ||*/ isSubmitting} className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
};
