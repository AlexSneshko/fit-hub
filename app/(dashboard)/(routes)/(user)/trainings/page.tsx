import { TrainingList } from "@/app/(dashboard)/_components/training/training-list";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { UserAuthorWithTrainings } from "@/types/user-author";
import { auth } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const TrainingsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const userWithTrainings = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      trainings: {
        include: {
          exercises: {
            include: {
              exercise: true,
            },
          },
        },
      },
      sharedTrainings: {
        include: {
          training: {
            include: {
              exercises: {
                include: {
                  exercise: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!userWithTrainings) {
    redirect("/");
  }

  const sharedTrainings = userWithTrainings.sharedTrainings.map(
    ({ training }) => training
  );

  return (
    <div className="px-6">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-2xl font-semibold">Trainings</h1>
        <Link href="/trainings/create">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" /> Training
          </Button>
        </Link>
      </div>
      <Tabs
        defaultValue="trainings"
        className="flex flex-col items-center justify-center mt-6"
      >
        <TabsList>
          <TabsTrigger value="trainings">My trainings</TabsTrigger>
          <TabsTrigger value="sharedTrainings">Shared trainings</TabsTrigger>
        </TabsList>
        <TabsContent value="trainings">
          <TrainingList data={userWithTrainings.trainings} />
        </TabsContent>
        <TabsContent value="sharedTrainings">
          <TrainingList data={sharedTrainings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingsPage;
