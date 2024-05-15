import { User } from "@prisma/client";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UserCardProps {
  data: User;
}

export const UserCard = ({ data }: UserCardProps) => {
  const fullname =
    data?.name || data?.surname ? `${data?.name} ${data?.surname}` : null;

  return (
    <Link href={`/${data.id}`}>
    <div className="flex shadow rounded-md p-4 hover:cursor-pointer hover:scale-105 transition">
      {!data.imageUrl ? (
        <div className="flex items-center justify-center h-32 w-32 bg-slate-200 rounded-full">
          <ImageIcon className="h-24 w-24 text-slate-500" />
        </div>
      ) : (
        <div className="relative aspect-video">
          <Image
            alt="Upload"
            width={96}
            height={96}
            className="rounded-full h-24 w-24"
            src={data.imageUrl}
          />
        </div>
      )}
      <div className="flex flex-col ml-4 justify-between">
        <div>
          <h3 className="text-lg font-semibold">{data.username}</h3>
          {fullname && <p className="text-slate-500">{fullname}</p>}
        </div>
        {data.isTrainer && <p className="text-sky-700 font-semibold">Trainer</p>}
      </div>
    </div>
    </Link>
  );
};
