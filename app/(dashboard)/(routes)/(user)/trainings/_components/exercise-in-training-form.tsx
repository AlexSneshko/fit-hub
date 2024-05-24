"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise } from "@prisma/client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

export const exerciseInTrainingFormSchema = z.object({
  exerciseId: z.string(),
});

interface ExerciseInTrainingFormProps {
  onSubmit: (values: z.infer<typeof exerciseInTrainingFormSchema>) => void;
  exercise?: Exercise;
}

export const ExerciseInTrainingForm = ({
  onSubmit,
  exercise,
}: ExerciseInTrainingFormProps) => {
  const router = useRouter();

  const [exercisesOptions, setExercisesOptions] = useState<Exercise[]>([]);

  const form = useForm<z.infer<typeof exerciseInTrainingFormSchema>>({
    resolver: zodResolver(exerciseInTrainingFormSchema),
    defaultValues: {
      exerciseId: exercise?.id,
    },
  });

  const { isSubmitting } = form.formState;

  const onDelete = async () => {
    try {
      await axios.delete(`/api/traingings/exercises/${exercise?.id}`);
      toast.success(`Exercise "${exercise?.title}" removed from training`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    axios
      .get(`/api/exercises`)
      .then((res) => {
        console.log(res.data)
        setExercisesOptions(res.data);
      })
      .catch((error) => {
        router.push("/trainings");
        router.refresh()
        toast.error("Something went wrong");
      });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-x-4">
        <FormField
          control={form.control}
          name="exerciseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an exercise" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {exercisesOptions.map((exercise) => (
                    <SelectItem key={exercise.id} value={exercise.id}>
                      {exercise.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Add an exercise for your training
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-x-2">
          {exercise && (
            <Button type="button" variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          )}
          <Button type="submit" disabled={/*!isValid ||*/ isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
