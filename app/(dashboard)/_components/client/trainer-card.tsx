"use client";

import Link from "next/link";

import { useAuth } from "@clerk/nextjs";
import { Avatar } from "@/app/(dashboard)/_components/avatar";
import { TrainerWithUserWithGymTrainerRelationship } from "@/types/trainer";
import { format } from "date-fns";

interface TrainerCardProps {
  data: TrainerWithUserWithGymTrainerRelationship;
}

export const TrainerCard = ({ data }: TrainerCardProps) => {
  const { userId } = useAuth();

  const fullname =
    data.user.name || data.user.surname
      ? `${data.user.name} ${data.user.surname}`
      : null;

  const gymRelashionShip = data.gymsRelationShips.find((gym) => gym.trainerId === data.userId);

  return (
    <div className="shadow rounded-md p-4 hover:cursor-pointer transition min-w-96">
      <div className="flex">
        <Link href={`/${data.user.username}`}>
          <Avatar avatarUrl={data.user.imageUrl} imgSize={128} />
        </Link>
        <div className="flex flex-col ml-4 justify-between w-full">
          <Link href={`/${data.user.username}`}>
            <div>
              <h3 className="text-lg font-semibold">{data.user.username}</h3>
              {fullname && <p className="text-slate-500">{fullname}</p>}
            </div>
          </Link>
          <p className="text-sky-700 font-semibold">Trainer</p>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <span className="block text-sm text-gray-600">
          Role:{" "}
          {gymRelashionShip?.role}
        </span>
        <span className="block text-sm text-gray-600">
          Joined on: {format(new Date(gymRelashionShip?.createdAt!), "PPP")}
        </span>
      </div>
    </div>
  );
};
