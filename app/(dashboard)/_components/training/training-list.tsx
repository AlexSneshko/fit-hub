import { TrainingWithExercises } from '@/types/training'
import { TrainingCard } from './training-card'

interface TrainingListProps {
    data: TrainingWithExercises[]
}

export const TrainingList = ({
    data
}: TrainingListProps) => {

    if (data.length === 0) {
        return (
            <div className="w-hull mt-10 flex items-center justify-center">
                <h1>No Trainings</h1>
            </div>
        )
    }

    return (
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-y-4 items-center">
            {data.map((training: TrainingWithExercises) => (
                <TrainingCard data={training} />
            ))}
        </div>
      )
}
