"use client";

import { User } from "@prisma/client";
import Link from "next/link";
import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface UserCardProps {
  data: User;
}

export const UserCard = ({ data }: UserCardProps) => {
  const router = useRouter();
  const { userId } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const onSubscribe = () => {
    try {
      const response = axios.post(`/api/users/subscriptions`, {
        userId: data.id,
      });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onUnsubscribe = () => {
    try {
      const response = axios.delete(`/api/users/${userId}/subscriptions`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  const fullname =
    data?.name || data?.surname ? `${data?.name} ${data?.surname}` : null;

  // useEffect(() => {
  //   try {
  //     const response = axios
  //       .get(`/api/users/${userId}/subscriptions`)
  //       .then((response) => {
  //         setIsSubscribed(!!response.data);
  //       });
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   }
  // }, [userId])

  return (
    // <Link href={`/${data.id}`}>
      <div className="flex shadow rounded-md p-4 hover:cursor-pointer hover:scale-105 transition">
        <UserAvatar avatarUrl={data.imageUrl} imgSize={32} />
        <div className="flex flex-col ml-4 justify-between">
          <div>
            <h3 className="text-lg font-semibold">{data.username}</h3>
            {fullname && <p className="text-slate-500">{fullname}</p>}
          </div>
          {data.isTrainer && (
            <p className="text-sky-700 font-semibold">Trainer</p>
          )}
        </div>
        {userId && (userId !== data.id) && (!isSubscribed ? (
          <Button
            onClick={onSubscribe}
            className="justify-self-end self-end"
          >
            Subscribe
          </Button>
        ): (
          <Button
            variant="outline"
            onClick={() => console.log("Unsubscribed")}
            className="justify-self-end self-end"
          >
            Unubscribe
          </Button>
        ))}
      </div>
    // </Link> 
  );
};
