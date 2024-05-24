"use client";

import { z } from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { SharedTraining, Training, User } from "@prisma/client";

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
import { TrainerWithTrainingsWithClients } from "@/types/trainer";

export const sharedTrainingFormSchema = z.object({
    trainingId: z.string(),
    userId: z.string(),
  });

interface SharedTrainingFormProps {
  onSubmit: (values: z.infer<typeof sharedTrainingFormSchema>) => void;
  sharedTraining?: SharedTraining
}

export const SharedTrainingForm = ({
    onSubmit,
    sharedTraining
}: SharedTrainingFormProps) => {
    const router = useRouter();
    const { userId } = useAuth();
  
    const [usersOptions, setUsersOptions] = useState<User[]>([]);
    const [trainingsOptions, setTrainingsOptions] = useState<Training[]>([]);
  
    const form = useForm<z.infer<typeof sharedTrainingFormSchema>>({
      resolver: zodResolver(sharedTrainingFormSchema),
      defaultValues: {
        trainingId: sharedTraining?.trainingId,
      }
    });
  
    const { isSubmitting } = form.formState;
  
    useEffect(() => {
      axios
        .get(`/api/trainers/${userId}`)
        .then((res) => {
          const trainer = res.data as TrainerWithTrainingsWithClients;
  
          setUsersOptions(trainer.clients.map(({ client }) => client).filter((user) => user.id !== userId));
          setTrainingsOptions(trainer.user.trainings);
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
          className="flex items-end gap-x-4"
        >
          <FormField
            control={form.control}
            name="trainingId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Training</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 w-32">
                      <SelectValue placeholder="Choose training" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {trainingsOptions.map((training) => (
                      <SelectItem key={training.id} value={training.id}>
                        <div className="flex items-center gap-x-2">
                          {training.title}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 w-32">
                      <SelectValue placeholder="Choose client" />
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
}
