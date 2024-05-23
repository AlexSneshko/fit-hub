import Link from 'next/link'
import { format } from 'date-fns';

import { TrainingWithExercises } from '@/types/training'

interface TrainingCardProps {
    data: TrainingWithExercises
}
  
  export const TrainingCard = ({ data }: TrainingCardProps) => {
    return (
        <Link href={`/trainings/${data.id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition w-full md:w-[600px]">
        <div className="p-6">
          
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{data.title}</h2>
          
          {data.description && (
            <p className="text-gray-700 text-base mb-4 line-clamp-3">{data.description}</p>
          )}
  
          <div className="flex items-center mb-4">
            {data.duration && (
              <span className="text-gray-600 text-sm">
                Duration: {format(new Date(data.duration), 'HH:mm:ss')}
              </span>
            )}
            {data.restTime && (
              <span className="text-gray-600 text-sm ml-4">
                Rest Time: {data.restTime}
              </span>
            )}
          </div>
  
          <div className="flex flex-wrap gap-4">
            {data.exercises.map((exerciseInTraining) => (
              <div
                key={exerciseInTraining.exercise.id}
                className="w-full sm:w-[calc(50%-8px)] bg-gray-100 rounded-lg p-4 mb-4"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {exerciseInTraining.exercise.title}
                </h3>
                {exerciseInTraining.exercise.description && (
                  <p className="text-gray-700 text-base mt-2 line-clamp-3">
                    {exerciseInTraining.exercise.description}
                  </p>
                )}
                {/* <div className="mt-2 text-gray-600 text-sm">
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
                    <div>Approaches: {exerciseInTraining.exercise.approachesNumber}</div>
                  )}
                  {exerciseInTraining.exercise.repetitionNumber && (
                    <div>Repetitions: {exerciseInTraining.exercise.repetitionNumber}</div>
                  )}
                </div> */}
              </div>
            ))}

          </div>
          {/* {data.exercises.length > 2 && (
              <span className="text-gray-500 text-sm">and more...</span>
            )} */}
  
          {/* <div className="mt-4">
            <Link href={`/trainings/${data.id}/edit`}>
              <button className="bg-blue-500 text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-blue-600 transition">
                View Training
              </button>
            </Link>
          </div> */}
        </div>
      </div>
      </Link>
    );
  };