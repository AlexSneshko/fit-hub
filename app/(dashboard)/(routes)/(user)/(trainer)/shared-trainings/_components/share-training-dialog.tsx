"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { SharedTrainingForm, sharedTrainingFormSchema } from "./shared-training-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SharedTrainingFormProps {
    trainerId: string;
}

export const ShareTrainingDialog = ({
    trainerId,
}: SharedTrainingFormProps) => {
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
  
    const onSubmit = async (data: z.infer<typeof sharedTrainingFormSchema>) => {
      try {
        const response = await axios.post(`/api/trainers/${trainerId}/shared-trainings`, data);
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
            <Plus className="w-4 h-4 mr-2" /> Shared Training
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share your train</DialogTitle>
            <DialogDescription>
              Choose user who you want to share with. 
              They will be able to see your train.
            </DialogDescription>
          </DialogHeader>
          <SharedTrainingForm onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    );
}
