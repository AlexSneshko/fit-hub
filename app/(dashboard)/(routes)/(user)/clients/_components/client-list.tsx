"use client";

import { UserCard } from "@/app/(dashboard)/_components/user/user-card";
import { Button } from "@/components/ui/button";
import { TrainerWithClients } from "@/types/trainer";
import { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface ClientListProps {
  data: TrainerWithClients;
}

export const ClientList = ({ data }: ClientListProps) => {
  const router = useRouter();

  const onDeleteClient = (clientId: string) => async () => {
    try {
      const response = await axios.delete(
        `/api/trainers/${data.userId}/clients/${clientId}`
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
      {data.clients.map((client) => (
        <div className="flex gap-x-2">
          <div className="flex flex-col">
            <UserCard key={client.clientId} data={client.client} />
            <span className="block text-sm text-gray-600">
              Your client since: {format(new Date(client.createdAt), "PPP")}
            </span>
          </div>
          <Button
            variant="destructive"
            className="px-3"
            onClick={onDeleteClient(client.clientId)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
