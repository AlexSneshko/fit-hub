import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Exercise } from "@prisma/client"

import { ExerciseCard } from "./exercise-card"

export const ExercisesGrid = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect("/")
    }

    const exercises = await db.exercise.findMany({
        where: {
            userId
        }
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map((exercise: Exercise) => (
            <ExerciseCard key={exercise.id} data={exercise}/>
        ))}
    </div>
  )
}
