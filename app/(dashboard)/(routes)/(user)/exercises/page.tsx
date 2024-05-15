import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { ExercisesGrid } from "./_components/exercises-grid";
import { db } from "@/lib/db";

const ExercisesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const exercises = await db.exercise.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="px-6">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-2xl font-semibold">Exercises</h1>
        <Link href="/exercises/create">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" /> Exercise
          </Button>
        </Link>
      </div>
      {exercises.length > 0 ? (
        <ExercisesGrid data={exercises} />
      ) : (
        <div className="text-center pt-24">
          <h2 className="text-2xl">No exercises</h2>
          <p className="text-slate-500">Add exericse to see it here</p>
        </div>
      )}
    </div>
  );
};

export default ExercisesPage;
