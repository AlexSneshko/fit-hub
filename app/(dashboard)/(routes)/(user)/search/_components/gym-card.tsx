"use client";

import { Avatar } from "@/app/(dashboard)/_components/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Gym } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface GymCardProps {
  data: Gym;
  isUserSubscribed: boolean;
}

export const GymCard = ({ data, isUserSubscribed }: GymCardProps) => {
  const { userId } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(isUserSubscribed);

  const onSubscribe = async () => {
    try {
      const response = await axios.post(`/api/users/subscriptions`, {
        gymId: data.id,
      });
      setIsSubscribed(true);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onUnsubscribe = async () => {
    try {
      const response = await axios.delete(
        `/api/users/subscriptions/${data.id}`
      );
      setIsSubscribed(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex shadow rounded-md p-4 hover:cursor-pointer transition min-w-96">
      <Link href={`/gym/${data.username}`}>
        <Avatar avatarUrl={data.imageUrl} imgSize={128} />
      </Link>
      <div className="flex flex-col ml-4 justify-between w-full">
        <Link href={`/gym/${data.username}`}>
          <div>
            <h3 className="text-lg font-semibold">{data.username}</h3>
            <p className="text-slate-500">{data.location}</p>
          </div>
        </Link>
        <div className="flex justify-end">
          {userId !== data.id &&
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
