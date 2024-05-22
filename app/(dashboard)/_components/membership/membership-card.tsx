import { GymMembership } from "@prisma/client";
import Link from "next/link";

interface MebershipListProps {
  data: GymMembership;
}

const MembershipCard = ({ data }: MebershipListProps) => {
  return (
    <Link href={`/gym/memberships/${data.id}`}>
      <div className="flex flex-col justify-between gap-y-4 hover:shadow-lg transition max-w-sm h-full rounded overflow-hidden shadow-md bg-white px-6 py-4">
        <div>
          <h2 className="font-semibold text-xl mb-2">{data.name}</h2>
          <p className="text-gray-700 text-base line-clamp-3">
            {data.description}
          </p>
        </div>
        <span className="w-fit bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          ${data.price}
        </span>
      </div>
    </Link>
  );
};

export default MembershipCard;
