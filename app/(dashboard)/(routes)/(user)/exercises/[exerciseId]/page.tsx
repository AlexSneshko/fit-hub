"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Exercise } from "@prisma/client";

import { ExerciseForm, exerciseFormSchema } from "../_components/exercise-form";

const ExerciseIdPage = ({
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
      router.push("/exercises?refresh=true");
    });
  }, [params.exerciseId, router]);
  
  if (!exercise) return <div>Loading...</div>;
  
  const onSubmitEdit = async (values: z.infer<typeof exerciseFormSchema>) => {
    console.log('values');
    try {
      const response = await axios.patch(`/api/exercises/${exercise.id}`, values);
      router.push(`/exercises/${response.data.id}`);
      toast.success("Exercise edited");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full mt-20 pb-20 px-6">
      <div>
        <h1 className="text-2xl">Exercise editing</h1>
        <ExerciseForm onSubmit={onSubmitEdit} exercise={exercise} />
      </div>
    </div>
  );
};

export default ExerciseIdPage;
