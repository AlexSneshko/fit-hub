import Link from "next/link";
import { ImageIcon, Pencil, Plus, User } from "lucide-react";
import { SignIn, UserButton, auth } from "@clerk/nextjs";
import { ProfileType } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostList } from "@/app/(dashboard)/_components/post/post-list";
import { db } from "@/lib/db";
import { UserAvatar } from "@/app/(dashboard)/_components/user/user-avatar";

export default async function Home({
  params,
}: {
  params: { profileId: string };
}) {
  const { userId } = auth();

  const user = await db.user.findUnique({
    where: {
      id: params.profileId,
    },
    include: {
      subscribtions: true,
      subscribers: true,
    },
  });

  if (!user && !userId) {
    redirect("/sign-in");
  }

  if (!user) {
    notFound();
  }

  // change to username comparing
  const isOwner = userId === params.profileId;

  const posts = await db.post.findMany({
    where: {
      authorType: ProfileType.USER,
      authorUserId: params.profileId,
    },
    include: {
      authorUser: true,
    },
  });

  const fullname =
    user?.name || user?.surname ? `${user?.name} ${user?.surname}` : null;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex md:w-[800px]">
        <UserAvatar avatarUrl={user.imageUrl} imgSize={32} />
        <div className="flex flex-col justify-between ml-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{user.username}</h1>
            {fullname ? <p className="text-slate-500">{fullname}</p> : null}
          </div>
          <div className="flex gap-x-2 justify-self-end self-end place-self-end">
            <p className="text-slate-500">
              Subscribtions: {user.subscribtions.length}
            </p>
            <p className="text-slate-500">
              Subscribers: {user.subscribers.length}
            </p>
          </div>
        </div>
        {isOwner && (
          <Link href={`/${user.id}/edit`}>
            <Button variant="outline">
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </Button>
          </Link>
        )}
      </div>
      {/* <UserButton afterSignOutUrl="/" /> */}
      <Tabs
        defaultValue="account"
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
            <TabsTrigger value="account">Posts</TabsTrigger>
            <TabsTrigger value="password">Exercises</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="account">
          <PostList data={posts} />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
