import { StaffCard } from "./staff-card";
import { GymAuthorWithStaff } from "@/types/gym-author";

interface StaffListProps {
  data: GymAuthorWithStaff;
}

export const StaffList = ({ data }: StaffListProps) => {
  if (data.staff.length === 0) {
    return (
      <div className="w-hull mt-10 flex items-center justify-center">
        <h1>No Staff</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-6 items-center justify-center">
      {data.staff.map((staff) => (
        <StaffCard
          key={staff.id}
          data={staff}
          gymName={data.username}
          username={staff.user?.username}
        />
      ))}
    </div>
  );
};
