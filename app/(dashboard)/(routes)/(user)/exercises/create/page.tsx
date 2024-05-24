"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { ExerciseForm, exerciseFormSchema } from "../_components/exercise-form";

const CreateExercisePage = () => {
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof exerciseFormSchema>) => {
    try {
      const response = await axios.post("/api/exercises", values);
      router.push(`/exercises/${response.data.id}`);
      toast.success("Exercise created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-2/3 mx-auto flex md:items-center md:justify-center">
      <div>
        <h1 className="text-2xl">Create your exercise</h1>
        <p className="text-sm text-slate-600">
          What would you like to tell about your exercise? Don&apos;t worry, you
          can change this later.
        </p>
        <ExerciseForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default CreateExercisePage;
