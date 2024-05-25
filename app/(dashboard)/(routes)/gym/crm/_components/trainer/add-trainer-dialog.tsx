"use client";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Plus } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { GymTrainerForm, gymTrainerFormSchema } from "./gym-trainer-form";

interface AddTrainerDialogProps {
  gymId: string;
}

export const AddTrainerDialog = ({ gymId }: AddTrainerDialogProps) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const onSubmit = async (data: z.infer<typeof gymTrainerFormSchema>) => {
    try {
      const response = await axios.post(`/api/gyms/${gymId}/trainers`, data);
      setOpenDialog(false)
      router.refresh()
      toast.success("Client created");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" /> Trainer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add trainer</DialogTitle>
          <DialogDescription>
            Choose trainer to your gym. 
          </DialogDescription>
        </DialogHeader>
        <GymTrainerForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
