import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddGymClientDialog } from "./_components/client/add-gym-client-dialog";
import { AddTrainerDialog } from "./_components/trainer/add-trainer-dialog";
import { GymClientList } from "./_components/client/gym-client-list";
import { TrainerList } from "../../../_components/client/trainer-list";

const CrmPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const gym = await db.gym.findUnique({
    where: {
      id: userId,
    },
    include: {
      trainersRelationShips: {
        include: {
          trainer: {
            include: {
              user: true,
              gymsRelationShips: true,
            },
          },
        },
      },
      clents: {
        include: {
          user: {
            include: {
              client: true,
            },
          },
        },
      },
    },
  });

  if (!gym) {
    redirect("/");
  }

  const gymClients = gym.clents.map(({ user }) => {
    return user;
  });

  const gymTrainers = gym.trainersRelationShips.map(({ trainer }) => {
    return trainer;
  });

  return (
    <div>
      <div className="flex items-center justify-between px-4 mb-6">
        <h1 className="text-2xl font-semibold">CRM</h1>
        <div className="flex gap-x-4">
          <AddGymClientDialog gymId={gym.id} />
          <AddTrainerDialog gymId={gym.id} />
        </div>
      </div>
      <Tabs
        defaultValue="clients"
        className="flex flex-col items-center justify-center"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="trainers">Trainers</TabsTrigger>
        </TabsList>
        <TabsContent value="clients">
          <GymClientList data={gymClients} />
        </TabsContent>
        <TabsContent value="trainers">
          <TrainerList data={gymTrainers} isOwner={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CrmPage;
