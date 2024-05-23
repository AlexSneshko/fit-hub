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
import { ClientForm, clientFormSchema } from "./client-form";

interface AddClientDialogProps {
  trainerId: string;
}

export const AddClientDialog = ({ trainerId }: AddClientDialogProps) => {
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof clientFormSchema>) => {
    try {
      const response = await axios.post(`/api/trainer/${trainerId}`, data);
      router.push("/clients?refresh=true");
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" /> Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add client</DialogTitle>
          <DialogDescription>
            Choose user who you want to be trainer for. You can share trainings
            with them.
          </DialogDescription>
        </DialogHeader>
        <ClientForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
