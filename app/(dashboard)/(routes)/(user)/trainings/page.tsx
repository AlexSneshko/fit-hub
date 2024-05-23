import { TrainingList } from "@/app/(dashboard)/_components/training/training-list";
import { Button } from "@/components/ui/button";
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
              exercise: true
            }
          }
        }
      }
    }
  });

  if (!userWithTrainings) {
    redirect("/");
  }

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

      <TrainingList data={userWithTrainings} />
    </div>
  );
};

export default TrainingsPage;
