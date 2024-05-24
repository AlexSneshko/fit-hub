import {
  TrainingWithSharedTrainingWithUser,
} from "@/types/trainer";
import { SharedTrainingCard } from "./shared-training-card";

interface ClientListProps {
  data: TrainingWithSharedTrainingWithUser[];
}

export const SharedTrainingList = ({ data }: ClientListProps) => {
  return (
    <div className="flex flex-col gap-y-6 items-center justify-center w-2/3 mx-auto">
      {data.map((sharedTraining) => (
        <SharedTrainingCard key={sharedTraining.id} data={sharedTraining} />
      ))}
    </div>
  );
};
