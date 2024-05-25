import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { Pencil, Plus } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/app/(dashboard)/_components/avatar";
import { PostList } from "@/app/(dashboard)/_components/post/post-list";
import { PromotionList } from "@/app/(dashboard)/_components/promotion/promotion-list";
import { MembershipList } from "@/app/(dashboard)/_components/membership/membership-list";
import { EquipmentList } from "@/app/(dashboard)/_components/equipment/equipment-list";
import { StaffList } from "@/app/(dashboard)/_components/staff/staff-list";
import { TrainerList } from "../../../../_components/client/trainer-list";

const GymPage = async ({ params }: { params: { username: string } }) => {
  const { userId } = auth();

  const gymWithInfo = await db.gym.findUnique({
    where: {
      username: params.username,
    },
    include: {
      subscribers: true,
      gymOpenTime: true,
      posts: {
        include: {
          authorUser: true,
          authorGym: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      trainersRelationShips: {
        include: {
          trainer: {
            include: {
              user: true,
              gymsRelationShips: true,
            },
          },
        },
      },
      gymMemberships: true,
      equipment: true,
      promotions: {
        orderBy: {
          createdAt: "desc",
        },
      },
      staff: {
        include: {
          user: true,
        },
      },
    },
  });

  // TODO: rethink of logic
  if (!gymWithInfo && !userId) {
    redirect("/sign-in");
  }

  if (!gymWithInfo) {
    notFound();
  }

  const isOwner = userId === gymWithInfo.id;

  const gymTrainers = gymWithInfo.trainersRelationShips.map(({ trainer }) => {
    return trainer;
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch sm:justify-start md:w-2/3 px-5">
        <div className="flex">
          <Avatar avatarUrl={gymWithInfo.imageUrl} imgSize={128} />
          <div className="flex flex-col justify-between ml-4">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">{gymWithInfo.username}</h1>
              <p className="text-slate-500">{gymWithInfo.name}</p>
              <p className="text-slate-500">{gymWithInfo.location}</p>
            </div>
            <div className="flex gap-x-2 justify-self-end self-end place-self-end">
              <p className="text-slate-500">
                Subscribers: {gymWithInfo.subscribers.length}
              </p>
            </div>
          </div>
        </div>
        {gymWithInfo.gymOpenTime && (
          <div className="py-2 px-4 ml-auto shadow-inner bg-slate-100 rounded my-4 sm:my-0">
            <p className="font-semibold text-center mb-4">Open Time</p>
            <div className="flex w-full justify-between gap-x-2">
              <div>
                <p>Weekday:</p>
                <p>Saturday:</p>
                <p>Sunday:</p>
              </div>
              <div className="flex flex-col  text-right">
                <p>
                  {gymWithInfo.gymOpenTime.weekDayOpen} -{" "}
                  {gymWithInfo.gymOpenTime.weekDayClose}
                </p>
                <p>
                  {gymWithInfo.gymOpenTime.saturdayOpen} -{" "}
                  {gymWithInfo.gymOpenTime.saturdayClose}
                </p>
                <p>
                  {gymWithInfo.gymOpenTime.sundayOpen} -{" "}
                  {gymWithInfo.gymOpenTime.sundayClose}
                </p>
              </div>
            </div>
          </div>
        )}
        {isOwner && (
          <Link href={`/gym/${gymWithInfo.username}/edit`} className="ml-auto">
            <Button variant="outline">
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </Button>
          </Link>
        )}
      </div>
      <Tabs
        defaultValue="posts"
        className="flex flex-col items-center justify-center mt-6"
      >
        <div className="flex items-center justify-center gap-x-6 mb-6">
          {isOwner && (
            <Link href={"/posts/create"}>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Post
              </Button>
            </Link>
          )}
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="trainers">Trainers</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
            <TabsTrigger value="memberships">Memberships</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="posts">
          <PostList data={gymWithInfo.posts} />
        </TabsContent>
        <TabsContent value="trainers">
          <TrainerList data={gymTrainers} isOwner={false} />
        </TabsContent>
        <TabsContent value="promotions">
          <PromotionList data={gymWithInfo} />
        </TabsContent>
        <TabsContent value="memberships">
          <MembershipList data={gymWithInfo} />
        </TabsContent>
        <TabsContent value="equipment">
          <EquipmentList data={gymWithInfo} />
        </TabsContent>
        <TabsContent value="staff">
          <StaffList data={gymWithInfo} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GymPage;
