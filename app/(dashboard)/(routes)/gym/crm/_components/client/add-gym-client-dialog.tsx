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
import { GymClientForm, gymClientFormSchema } from "./gym-client-form";
import { useState } from "react";

interface AddGymClientDialogProps {
  gymId: string;
}

export const AddGymClientDialog = ({ gymId }: AddGymClientDialogProps) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const onSubmit = async (data: z.infer<typeof gymClientFormSchema>) => {
    try {
      const response = await axios.post(`/api/gyms/${gymId}/clients`, data);
      setOpenDialog(false);
      router.refresh();
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
          <Plus className="w-4 h-4 mr-2" /> Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add client</DialogTitle>
          <DialogDescription>
            Choose user to be client. This will add the user to the gym.
          </DialogDescription>
        </DialogHeader>
        <GymClientForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
