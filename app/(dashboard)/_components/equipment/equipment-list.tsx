import { GymAuthorWithEquipment } from "@/types/gym-author";
import { EquipmentCard } from "./equipment-card";

interface PromotionListProps {
  data: GymAuthorWithEquipment;
}

export const EquipmentList = ({ data }: PromotionListProps) => {
  if (data.equipment.length === 0) {
    return (
      <div className="w-hull mt-10 flex items-center justify-center">
        <h1>No Equipments</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-6 items-center justify-center">
      {data.equipment.map((equipment) => (
        <EquipmentCard 
          key={equipment.id}
          data={equipment}
          gymName={data.username}
        />
      ))}
    </div>
  );
};
