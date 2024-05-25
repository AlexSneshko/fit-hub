"use client"

import axios, { AxiosError } from "axios";
import { useAuth } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { ClientCard } from "./gym-client-card";
import { UserWithClient } from "@/types/user";

interface GymClientListProps {
  data: UserWithClient[];
}

export const GymClientList = ({ data }: GymClientListProps) => {
  const { userId } = useAuth();
  const router = useRouter();

  if (!userId) {
    return null;
  }

  if (data.length === 0) {
    return (
      <div className="w-hull mt-10 flex items-center justify-center">
        <h1>No Clients</h1>
      </div>
    );
  }

  const onDeleteClient = (clientId: string) => async () => {
    try {
      const response = await axios.delete(
        `/api/gyms/${userId}/clients/${clientId}`
      );
      router.refresh();
      toast.success("Client removed");
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

      {data.map((client) => (
        <div className="flex gap-x-2">
        <ClientCard key={client.id} data={client} />

          <Button
            variant="destructive"
            className="px-3"
            onClick={onDeleteClient(client.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
      </div>
      ))}
    </div>
  );
};
