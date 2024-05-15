import { Exercise } from "@prisma/client"

import { ExerciseCard } from "./exercise-card"

interface ExercisesGridProps {
    data: Exercise[]
}

export const ExercisesGrid = async ({
    data
}: ExercisesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((exercise: Exercise) => (
            <ExerciseCard key={exercise.id} data={exercise}/>
        ))}
    </div>
  )
}
