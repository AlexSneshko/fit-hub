"use client";

import { auth, useAuth } from "@clerk/nextjs";

import { TrainerCard } from "./trainer-card";
import { TrainerWithUserWithGymTrainerRelationship } from "@/types/trainer";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";

interface TrainerListProps {
  data: TrainerWithUserWithGymTrainerRelationship[];
  isOwner: boolean;
}

export const TrainerList = ({ data, isOwner }: TrainerListProps) => {
  const { userId } = useAuth();
  const router = useRouter();

  if (!userId) {
    return null;
  }

  if (data.length === 0) {
    return (
      <div className="w-hull mt-10 flex items-center justify-center">
        <h1>No Trainers</h1>
      </div>
    );
  }

  const onDeleteTrainer = (trainerId: string) => async () => {
    try {
      const response = await axios.delete(
        `/api/gyms/${userId}/trainers/${trainerId}`
      );
      router.refresh();
      toast.success("Trainer removed");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-6 items-center justify-center">
      {data.map((trainer) => (
        <div className="flex gap-x-2">
          <TrainerCard key={trainer.userId} data={trainer} />
          {isOwner && (
            <Button
              variant="destructive"
              className="px-3"
              onClick={onDeleteTrainer(trainer.userId)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
