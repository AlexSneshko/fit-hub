"use client";

import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import {
  TrainingInfoForm,
  trainingInfoFormSchema,
} from "../_components/training-info-form";

const CreateTrainingPage = () => {
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof trainingInfoFormSchema>) => {
    try {
      const response = await axios.post("/api/trainings", data);
      router.push(`/trainings/${response.data.id}/edit`);
      toast.success("Training created");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="mx-auto w-2/3">
      <h1 className="text-center text-2xl">Create Training</h1>
      <TrainingInfoForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreateTrainingPage;
