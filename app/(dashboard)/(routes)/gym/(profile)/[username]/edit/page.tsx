"use client";

import { useRouter } from "next/navigation";
import { GymForm, gymFormSchema } from "../../_components/gym-form";
import axios from "axios";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Gym } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import {
  GymOpenTimeForm,
  gymOpenTimeFormSchema,
} from "../../_components/gym-open-time-form";
import { GymWithOpenTime } from "@/types/gym";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EditGymPage = ({ params }: { params: { username: string } }) => {
  const router = useRouter();
  const { userId } = useAuth();

  const [gym, setGym] = useState<GymWithOpenTime>();

  const onEdit = async (values: z.infer<typeof gymFormSchema>) => {
    try {
      const response = await axios.patch(`/api/gyms/${userId}`, values);
      router.push(`/gym/${params.username}`);
      router.refresh();
      toast.success("Gym updated");
    } catch (error) {
      toast.error("Failed to update gym");
    }
  };

  const onGymOpenTimeEdit = async (
    values: z.infer<typeof gymOpenTimeFormSchema>
  ) => {
    try {
      const response = await axios.patch(
        `/api/gyms/${userId}/gym-open-time`,
        values
      );
      router.push(`/gym/${params.username}`);
      router.refresh();
      toast.success("Gym updated");
    } catch (error) {
      toast.error("Failed to update gym");
    }
  };

  const onGymOpenTimeCreate = async (
    values: z.infer<typeof gymOpenTimeFormSchema>
  ) => {
    try {
      const response = await axios.post(
        `/api/gyms/${userId}/gym-open-time`,
        values
      );
      router.push(`/gym/${params.username}`);
      router.refresh();
      toast.success("Gym updated");
    } catch (error) {
      toast.error("Failed to update gym");
    }
  };

  useEffect(() => {
    axios
      .get(`/api/gyms/${userId}`)
      .then((res) => {
        if (!res.data) {
          router.push(`/gym/${params.username}`);
        }
        setGym(res.data);
      })
      .catch(() => {
        router.push(`/gym/${params.username}`);
      });
  }, [params.username, router]);

  if (!gym) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto w-2/3">
      <h1 className="text-2xl">Gym editing</h1>
      <Tabs
        defaultValue="gym"
        className="flex flex-col"
      >
        <TabsList className="mb-4 self-center">
          <TabsTrigger value="gym">Gym</TabsTrigger>
          <TabsTrigger value="open-time">Open time</TabsTrigger>
        </TabsList>
        <TabsContent value="gym">
          <GymForm onSubmit={onEdit} gym={gym} />
        </TabsContent>
        <TabsContent value="open-time">
          {gym.gymOpenTime ? (
            <GymOpenTimeForm
              onSubmit={onGymOpenTimeEdit}
              gymOpenTime={gym.gymOpenTime}
            />
          ) : (
            <GymOpenTimeForm onSubmit={onGymOpenTimeCreate} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditGymPage;
