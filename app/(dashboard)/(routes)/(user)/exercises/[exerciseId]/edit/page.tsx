"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Exercise } from "@prisma/client";

import { ExerciseForm, exerciseFormSchema } from "../../_components/exercise-form";

const EditExercisePage = ({
  params,
}: {
  params: {
    exerciseId: string;
  };
}) => {
  const [exercise, setExercise] = useState<Exercise>();

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/exercises/${params.exerciseId}`)
      .then((response) => {
        setExercise(response.data);
      })
      .catch((error) => {
        toast.error(error);
        router.push("/exercises");
        router.refresh();
      });
  }, [params.exerciseId, router]);

  if (!exercise) return <div>Loading...</div>;

  const onSubmitEdit = async (values: z.infer<typeof exerciseFormSchema>) => {
    try {
      const response = await axios.patch(
        `/api/exercises/${exercise.id}`,
        values
      );
      router.push(`/exercises`);
      router.refresh()
      toast.success("Exercise edited");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-2/3 mx-auto flex flex-col items-center justify-center md:mt-20">
      <h1 className="text-2xl">Exercise editing</h1>
      <ExerciseForm onSubmit={onSubmitEdit} exercise={exercise} />
    </div>
  );
};

export default EditExercisePage;
