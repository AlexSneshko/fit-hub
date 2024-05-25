"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { MouseEvent, useState } from "react";
import { User } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Avatar } from "../avatar";

interface UserCardProps {
  data: User;
  isUserSubscribed?: boolean;
}

export const UserCard = ({ data, isUserSubscribed }: UserCardProps) => {
  const { userId } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>(isUserSubscribed);

  const onSubscribe = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await axios.post(`/api/users/subscriptions`, {
        userId: data.id,
      });
      setIsSubscribed(true);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onUnsubscribe = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await axios.delete(
        `/api/users/subscriptions/${data.id}`
      );
      setIsSubscribed(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fullname =
    data?.name || data?.surname ? `${data?.name} ${data?.surname}` : null;

  return (
    <div className="flex shadow rounded-md p-4 hover:cursor-pointer transition min-w-96">
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
          {isUserSubscribed !== undefined &&
            userId !== data.id &&
            (!isSubscribed ? (
              <Button
                size="sm"
                onClick={onSubscribe}
                className="justify-self-end self-end"
              >
                Subscribe
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onUnsubscribe}
                className="justify-self-end self-end"
              >
                Unsubscribe
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};
