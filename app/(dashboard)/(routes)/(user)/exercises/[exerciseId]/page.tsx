import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

const ExerciseIdPage = async ({
  params,
}: {
  params: {
    exerciseId: string;
  };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const exercise = await db.exercise.findUnique({
    where: {
      id: params.exerciseId,
    },
  });

  if (!exercise) {
    notFound();
  }

  const isOwner = exercise.userId === userId;

  return (
    <div className="w-full p-5">
      <div className="flex">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          {exercise.title}
        </h1>
        {isOwner && (
          <Link href={`/exercises/${exercise.id}/edit`}>
            <Button variant="outline" className="ml-4">
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </Button>
          </Link>
        )}
      </div>
      <p className="text-gray-700 mb-4 px-2">{exercise.description}</p>
      <div className="flex flex-col justify-start bg-slate-200 rounded shadow-inner py-2 px-4 w-fit">
        {exercise.duration && <p className="text-gray-700 mb-4 px-2">Duration: {exercise.duration}</p>}
        {exercise.restTime && <p className="text-gray-700 mb-4 px-2">Rest Time: {exercise.restTime}</p>}
        {exercise.weight && <p className="text-gray-700 mb-4 px-2">Weight: {exercise.weight}kg</p>}
        {exercise.approachesNumber && <p className="text-gray-700 mb-4 px-2">Approaches: {exercise.approachesNumber} times</p>}
        {exercise.repetitionNumber && <p className="text-gray-700 mb-4 px-2">Repetitions: {exercise.repetitionNumber} times</p>}
      </div>
    </div>
  );
};

export default ExerciseIdPage;
