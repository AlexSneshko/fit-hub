"use client";

import { User } from "@prisma/client";
import Link from "next/link";
import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";

interface UserCardProps {
  data: User;
}

export const UserCard = ({ data }: UserCardProps) => {
  const router = useRouter();
  const { userId } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState<boolean>();

  const onSubscribe = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await axios.post(`/api/users/subscriptions`, {
        userId: data.id,
      });
      setIsSubscribed(true);
      router.refresh();
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
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fullname =
    data?.name || data?.surname ? `${data?.name} ${data?.surname}` : null;

  useEffect(() => {
    try {
      const response = axios
        .get(`/api/users/subscriptions/${data.id}`)
        .then((response) => {
          setIsSubscribed(!!response.data);
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [data.id]);

  return (
    <div className="flex shadow rounded-md p-4 hover:cursor-pointer transition min-w-96">
      <Link href={`/${data.id}`}>
        <UserAvatar avatarUrl={data.imageUrl} imgSize={32} />
      </Link>
      <div className="flex flex-col ml-4 justify-between w-full">
        <Link href={`/${data.id}`}>
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
          {userId &&
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
