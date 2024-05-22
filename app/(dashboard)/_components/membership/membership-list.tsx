import { GymAuthorWithMemberships } from "@/types/gym-author"

import MembershipCard from "./membership-card";

interface PromotionListProps {
    data: GymAuthorWithMemberships
}

export const MembershipList = ({
    data
}: PromotionListProps) => {
  if (data.gymMemberships.length === 0) {
    return (
      <div className="w-hull mt-10 flex items-center justify-center">
        <h1>No Memberships</h1>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-x-10 gap-y-10 w-fit mx-auto">
      {data.gymMemberships.map((membership) => (
        <MembershipCard key={membership.id} data={membership} />
      ))}
    </div>
  );
}
