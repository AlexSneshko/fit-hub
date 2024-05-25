import Link from "next/link";
import { User } from "@prisma/client";

import { Avatar } from "@/app/(dashboard)/_components/avatar";
import { UserWithClient } from "@/types/user";
import { format } from "date-fns";

interface UserCardProps {
  data: UserWithClient;
}

export const ClientCard = ({ data }: UserCardProps) => {
  const fullname =
    data?.name || data?.surname ? `${data?.name} ${data?.surname}` : null;

  return (
    <div className="shadow rounded-md p-4 hover:cursor-pointer transition min-w-96">
      <div className="flex">
        <Link href={`/${data.username}`}>
          <Avatar avatarUrl={data.imageUrl} imgSize={128} />
        </Link>
        <div className="flex flex-col ml-4 justify-between w-full">
          <Link href={`/${data.username}`}>
            <div>
              <h3 className="text-lg font-semibold">{data.username}</h3>
              {fullname && <p className="text-slate-500">{fullname}</p>}
            </div>
          </Link>
          <div
            className={
              data.isTrainer
                ? "flex justify-between items-center"
                : "flex justify-end"
            }
          >
            {data.isTrainer && (
              <p className="text-sky-700 font-semibold">Trainer</p>
            )}
          </div>
        </div>
      </div>
      <span className="block text-sm text-gray-600 mt-4">
        Your client since: {format(new Date(data.client!.createdAt), "PPP")}
      </span>
    </div>
  );
};
