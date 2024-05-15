import Link from "next/link";
import { Exercise } from "@prisma/client";

interface ExerciseCardProps {
  data: Exercise;
}

export const ExerciseCard = ({ data }: ExerciseCardProps) => {
  const {
    id,
    title,
    description,
    duration,
    restTime,
    weight,
    approachesNumber,
    repetitionNumber,
    userId,
    categoryId,
  } = data;
  return (
    <Link href={`/exercises/${data.id}`}>
      <div className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transition h-full">
        <h2 className="text-md font-medium mb-4">{title}</h2>
        {description && <p className="text-gray-700 mb-2">{description}</p>}
        {duration && <p className="text-gray-700 mb-2">Duration: {duration}</p>}
        {restTime && (
          <p className="text-gray-700 mb-2">Rest Time: {restTime}</p>
        )}
        {weight && <p className="text-gray-700 mb-2">Weight: {weight}</p>}
        {approachesNumber && (
          <p className="text-gray-700 mb-2">Approaches: {approachesNumber}</p>
        )}
        {repetitionNumber && (
          <p className="text-gray-700 mb-2">Repetitions: {repetitionNumber}</p>
        )}
      </div>
    </Link>
  );
};
