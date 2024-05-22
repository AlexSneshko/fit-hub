import Image from "next/image";
import Link from "next/link";
import { Staff } from "@prisma/client";
import { format } from "date-fns";

interface StaffCardProps {
  data: Staff;
  gymName: string;
  username?: string;
}

export const StaffCard = ({ data, gymName, username }: StaffCardProps) => {
  return (
    <div className="flex rounded shadow-md bg-white w-[600px] h-max-[500px] hover:shadow-lg transition">
      {data.imageUrl && (
        <Image
          src={data.imageUrl}
          alt={data.fullName}
          width={200}
          height={200}
          className="object-cover rounded-l"
        />
      )}
      <div className="flex flex-col px-4 pt-2 pb-1 w-full">
        <Link href={`/gym/staff/${data.id}`}>
          <div className="flex items-center justify-between mb-2 w-full">
            <h3 className="font-bold text-xl">{data.fullName}</h3>
          </div>
          <h4 className="text-gray-700 text-base mb-2">{data.role}</h4>
          {data.description && (
            <p className="text-gray-700 text-base line-clamp-3 mb-2">
              {data.description}
            </p>
          )}
        </Link>

        <div className="flex flex-col gap-y-2 mt-auto mb-0">
          <span className="block text-sm text-gray-600">
          Joined on: {format(new Date(data.firstDate), "PPP")}
          </span>
          <div className="flex gap-x-2">
            {username && (
              <Link href={`/${username}`}>
                <button className="inline-block bg-sky-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {username}
                </button>
              </Link>
            )}
            <Link href={`/gym/${gymName}`}>
              <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {gymName}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
