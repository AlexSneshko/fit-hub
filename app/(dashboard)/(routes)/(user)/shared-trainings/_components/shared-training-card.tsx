"use client";

import { Trash2 } from "lucide-react";

import { Avatar } from "@/app/(dashboard)/_components/avatar";
import { Button } from "@/components/ui/button";
import { TrainingWithSharedTrainingWithUser } from "@/types/trainer";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface SharedTrainingCardProps {
  data: TrainingWithSharedTrainingWithUser;
}

export const SharedTrainingCard = ({ data }: SharedTrainingCardProps) => {
  const router = useRouter();

  if (data.sharedTraining.length === 0) return null;

  const onDeleteClientFromTraining = (clientId: string) => async () => {
    try {
      const response = await axios.delete(`/api/trainers/${data.userId}/shared-trainings/${data.id}`,
        {
          data: {
            clientId
          }
        }
      );
      router.refresh();
      toast.success("Client removed from training");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-white p-6 m-4">
      <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
      {data.description && (
        <p className="text-gray-700 mb-4 line-clamp-3">{data.description}</p>
      )}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Users with Access</h3>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {data.sharedTraining.map(({ user }) => (
            <div className="flex gap-x-2 items-center">
              <div
                key={user.id}
                className="flex items-center space-x-4 bg-slate-200 shadow-inner rounded w-full px-4 py-2"
              >
                <Avatar avatarUrl={user.imageUrl} imgSize={40} />
                <div>
                  <p className="text-gray-800 font-medium">{user.username}</p>
                  {user.name && (
                    <p className="text-gray-600">{`${user.name} ${
                      user.surname ?? ""
                    }`}</p>
                  )}
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={onDeleteClientFromTraining(user.id)}
                className="px-3"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
