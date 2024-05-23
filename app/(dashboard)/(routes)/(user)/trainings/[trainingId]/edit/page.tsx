"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { TrainingWithExercises } from "@/types/training";
import { useAuth } from "@clerk/nextjs";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { toast } from "react-hot-toast";
import {
  TrainingInfoForm,
  trainingInfoFormSchema,
} from "../../_components/training-info-form";
import {
  ExerciseInTrainingForm,
  exerciseInTrainingFormSchema,
} from "../../_components/exercise-in-training-form";
import { ExerciseInTrainingList } from "../../_components/exercise-in-training-list";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Link from "next/link";

const EditTrainingPage = ({ params }: { params: { trainingId: string } }) => {
  const router = useRouter();
  const [training, setPromotion] = useState<TrainingWithExercises>();
  const { userId } = useAuth();

  if (!userId) {
    router.push("/sign-in");
  }

  const onEditInfo = async (data: z.infer<typeof trainingInfoFormSchema>) => {
    try {
      const response = await axios.patch(
        `/api/trainings/${params.trainingId}`,
        data
      );
      toast.success("Trining info updated");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/trainings/${params.trainingId}`);
      toast.success(`Promotion "${training?.title}" deleted`);
      router.push("/trainings");
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
      .get(`/api/trainings/${params.trainingId}`)
      .then((res) => {
        if (!res.data) {
          router.push("/trainings");
        }
        if (res.data.userId !== userId) {
          router.push("/");
        }
        setPromotion(res.data);
      })
      .catch((error) => {
        router.push(`/trainings`);
        if (error instanceof AxiosError) {
          toast.error(error.response?.data);
        } else {
          toast.error("Something went wrong");
        }
      });
  }, [params.trainingId, router]);

  if (!training) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto w-2/3">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Edit Promotion</h1>
        <div className="flex gap-x-4">
        <Link href="/trainings?refresh=true">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </Button>
        </div>
      </div>
      <TrainingInfoForm onSubmit={onEditInfo} training={training} />
      <ExerciseInTrainingList trainingWithExercises={training} />
    </div>
  );
};

export default EditTrainingPage;
