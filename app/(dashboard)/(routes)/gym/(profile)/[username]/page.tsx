import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { Pencil, Plus } from "lucide-react";

import { PostList } from "@/app/(dashboard)/_components/post/post-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/app/(dashboard)/_components/avatar";
import { PromotionList } from "@/app/(dashboard)/_components/promotion/promotion-list";
import { MembershipList } from "@/app/(dashboard)/_components/membership/membership-list";

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
          likes: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      trainers: true,
      gymMemberships: true,
      equipment: true,
      promotions: true,
      staff: true,
    },
  });

  // TODO: rethink of logic
  if (!gymWithInfo && !userId) {
    redirect("/sign-in");
  }

  if (!gymWithInfo) {
    notFound();
  }

  // change to username comparing
  const isOwner = userId === gymWithInfo.id;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex md:w-[800px]">
        <Avatar avatarUrl={gymWithInfo.imageUrl} imgSize={128} />
        <div className="flex flex-col justify-between ml-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{gymWithInfo.username}</h1>
            <p className="text-slate-500">{gymWithInfo.name}</p>
          </div>
          <div className="flex gap-x-2 justify-self-end self-end place-self-end">
            <p className="text-slate-500">
              Subscribers: {gymWithInfo.subscribers.length}
            </p>
          </div>
        </div>
        {isOwner && (
          <Link href={`/gym/${gymWithInfo.username}/edit`}>
            <Button variant="outline">
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </Button>
          </Link>
        )}
      </div>
      {/* <UserButton afterSignOutUrl="/" /> */}
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
          Posts{/* <PostList data={gymWithInfo} /> */}
        </TabsContent>
        <TabsContent value="trainers">Trainers</TabsContent>
        <TabsContent value="promotions">
          <PromotionList data={gymWithInfo} />
        </TabsContent>
        <TabsContent value="memberships">
          <MembershipList data={gymWithInfo} />
        </TabsContent>
        <TabsContent value="equipment">Equipment</TabsContent>
        <TabsContent value="staff">Staff</TabsContent>
      </Tabs>
    </div>
  );
};

export default GymPage;
