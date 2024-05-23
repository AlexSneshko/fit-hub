"use client";

import { TrainingWithExercises } from "@/types/training";
import { auth, useAuth } from "@clerk/nextjs";
import { ExerciseInTraining } from "./exercise-in-training";
import {
  ExerciseInTrainingForm,
  exerciseInTrainingFormSchema,
} from "./exercise-in-training-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ExerciseInTrainingProps {
  trainingWithExercises: TrainingWithExercises;
}

export const ExerciseInTrainingList = ({
  trainingWithExercises,
}: ExerciseInTrainingProps) => {
  const { userId } = useAuth();

  const [trainings, setTrainings] = useState<TrainingWithExercises>(
    trainingWithExercises
  );

  const isOwner = trainingWithExercises.userId === userId;

  const onAddExercise = async (
    data: z.infer<typeof exerciseInTrainingFormSchema>
  ) => {
    try {
      const response = await axios.post(
        `/api/trainings/${trainingWithExercises.id}/exercises`,
        data
      );

      setTrainings(response.data);

      toast.success("Exercise added to training");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const onDelete = async (exerciseId: string) => {
    try {
      const response = await axios.delete(
        `/api/trainings/${trainingWithExercises.id}/exercises/${exerciseId}`
      );

      setTrainings(response.data);

      toast.success("Exercise removed from training");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div>
      <ExerciseInTrainingForm onSubmit={onAddExercise} />
      <h2 className="my-4 font-semibold">Exercises list</h2>
      <div className="flex flex-col gap-y-4">
        {trainings.exercises.map((exercise) => (
          <div className="flex items-center gap-x-4">
            <ExerciseInTraining
              key={exercise.exerciseId}
              exercise={exercise.exercise}
            />
            <Button
              variant="destructive"
              onClick={() => onDelete(exercise.exerciseId)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
