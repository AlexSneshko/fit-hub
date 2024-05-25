import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const TrainingIdPage = async ({
  params,
}: {
  params: { trainingId: string };
}) => {
  const { userId } = auth();

  const training = await db.training.findUnique({
    where: {
      id: params.trainingId,
    },
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
  });

  if (!training) {
    return notFound();
  }

  const isOwner = training.userId === userId;

  return (
    <div className="container mx-auto p-6">
      <div className="flex">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          {training.title}
        </h1>
        {isOwner && (
          <Link href={`/trainings/${training.id}/edit`}>
            <Button variant="outline" className="ml-4">
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </Button>
          </Link>
        )}
      </div>
      {training.description && (
        <p className="text-gray-700 text-base mb-4 px-2">
          {training.description}
        </p>
      )}
      <div className="flex flex-wrap justify-between items-center text-gray-600 mb-4">
        {training.duration && (
          <span className="mr-4">Duration: {training.duration}</span>
        )}
        {training.restTime && (
          <span className="mr-4">Rest Time: {training.restTime}</span>
        )}
      </div>
      <h2 className="text-2xl font-semibold mb-4">Exercises</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {training.exercises.map((exerciseInTraining) => (
          <Link
            href={`/exercises/${exerciseInTraining.exercise.id}`}
            key={exerciseInTraining.exercise.id}
            className="md:justify-self-center w-full sm:max-w-[250px]"
          >
            <div
              key={exerciseInTraining.exercise.id}
              className=" p-4 h-full bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {exerciseInTraining.exercise.title}
              </h3>
              {exerciseInTraining.exercise.description && (
                <p className="text-gray-700 mt-2">
                  {exerciseInTraining.exercise.description}
                </p>
              )}
              <div className="mt-2 text-gray-600">
                {exerciseInTraining.exercise.duration && (
                  <div>Duration: {exerciseInTraining.exercise.duration}</div>
                )}
                {exerciseInTraining.exercise.restTime && (
                  <div>Rest Time: {exerciseInTraining.exercise.restTime}</div>
                )}
                {exerciseInTraining.exercise.weight && (
                  <div>Weight: {exerciseInTraining.exercise.weight} kg</div>
                )}
                {exerciseInTraining.exercise.approachesNumber && (
                  <div>
                    Approaches: {exerciseInTraining.exercise.approachesNumber}
                  </div>
                )}
                {exerciseInTraining.exercise.repetitionNumber && (
                  <div>
                    Repetitions: {exerciseInTraining.exercise.repetitionNumber}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrainingIdPage;
