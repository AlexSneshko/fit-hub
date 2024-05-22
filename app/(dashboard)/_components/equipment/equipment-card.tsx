import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Equipment } from "@prisma/client";

interface EquipmentCardProps {
  data: Equipment;
  gymName: string;
}

export const EquipmentCard = ({ data, gymName }: EquipmentCardProps) => {
  return (
    <div className="flex rounded shadow-md bg-white w-[600px] h-max-[500px] hover:shadow-lg transition">
      {data.imageUrl && (
        <Image
          src={data.imageUrl}
          alt={data.name}
          width={200}
          height={120}
          className="object-cover rounded-l"
        />
      )}
      <div className="flex flex-col px-4 pt-2 pb-1 w-full">
        <Link href={`/gym/equipments/${data.id}`}>
          <div className="flex items-center justify-between mb-2 w-full">
            <h3 className="font-bold text-xl">{data.name}</h3>
          </div>
          {data.description && (
            <p className="text-gray-700 text-base line-clamp-3 mb-2">
              {data.description}
            </p>
          )}
        </Link>

        <div className="flex flex-col gap-y-2 mt-auto mb-0">
          <span className="block text-sm text-gray-600">
            Added on: {format(new Date(data.createdAt), "PPP")}
          </span>
          <Link href={`/gym/${gymName}`}>
            <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {gymName}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
