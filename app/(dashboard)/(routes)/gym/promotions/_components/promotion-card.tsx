import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Promotion } from "@prisma/client";

interface PromotionCardProps {
  data: Promotion;
  authorName: string;
}

export const PromotionCard = ({ data, authorName }: PromotionCardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {data.imageUrl && (
        <Image
          src={data.imageUrl}
          alt={data.name}
          width={400}
          height={250}
          className="w-full"
        />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{data.name}</div>
        {data.description && (
          <p className="text-gray-700 text-base">{data.description}</p>
        )}
        <div className="mt-4">
          <span className="block text-sm text-gray-600">
            Starts: {format(new Date(data.firstDate), "PPP")}
          </span>
          <span className="block text-sm text-gray-600">
            Ends: {format(new Date(data.lastDate), "PPP")}
          </span>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link href={`/gym/${authorName}`}>
          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {authorName}
          </button>
        </Link>
      </div>
    </div>
  );
};
