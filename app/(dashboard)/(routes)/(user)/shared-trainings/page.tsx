import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ShareTrainingDialog } from "./_components/share-training-dialog";
import { SharedTrainingList } from "./_components/shared-training-list";

const SharedTrainingsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const trainerWithInfo = await db.trainer.findUnique({
    where: {
      userId: userId,
    },
    include: {
      user: {
        include: {
          trainings: {
            include: {
              sharedTraining: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!trainerWithInfo) {
    redirect("/");
  }

  return (
    <div>
      <div className="flex items-center justify-between px-4 mb-6">
        <h1 className="text-2xl font-semibold">Shared Trainings</h1>
        <ShareTrainingDialog trainerId={trainerWithInfo.userId} />
      </div>
      <SharedTrainingList data={trainerWithInfo.user.trainings} />
    </div>
  );
};

export default SharedTrainingsPage;
