import { Exercise } from "@prisma/client";

interface ExerciseInTrainingProps {
  exercise: Exercise;
}

export const ExerciseInTraining = ({ exercise }: ExerciseInTrainingProps) => {
  return (
    <div className="p-4 border rounded w-full">
        <p className="line-clamp-2">
        {exercise.title}: {exercise.description}
        </p>
    </div>
  );
};
