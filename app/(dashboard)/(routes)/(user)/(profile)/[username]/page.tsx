import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { auth } from "@clerk/nextjs";;
import { notFound, redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostList } from "@/app/(dashboard)/_components/post/post-list";
import { db } from "@/lib/db";
import { Avatar } from "@/app/(dashboard)/_components/avatar";

const UserProfilePage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const { userId } = auth();

  const user = await db.user.findUnique({
    where: {
      username: params.username,
    },
    include: {
      subscriptions: true,
      subscribers: true,
      posts: true,
      exercises: true,
    },
  });

  if (!user && !userId) {
    redirect("/sign-in");
  }

  if (!user) {
    notFound();
  }

  // change to username comparing
  const isOwner = user.username === params.username;

  // const posts = await db.post.findMany({
  //   where: {
  //     authorType: ProfileType.USER,
  //     authorUserId: params.profileId,
  //   },
  //   include: {
  //     authorUser: true,
  //   },
  // });

  const fullname =
    user?.name || user?.surname ? `${user?.name} ${user?.surname}` : null;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex md:w-[800px]">
        <Avatar avatarUrl={user.imageUrl} imgSize={32} />
        <div className="flex flex-col justify-between ml-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{user.username}</h1>
            {fullname ? <p className="text-slate-500">{fullname}</p> : null}
          </div>
          <div className="flex gap-x-2 justify-self-end self-end place-self-end">
            <p className="text-slate-500">
              Subscribtions: {user.subscriptions.length}
            </p>
            <p className="text-slate-500">
              Subscribers: {user.subscribers.length}
            </p>
          </div>
        </div>
        {isOwner && (
          <Link href={`/${user.username}/edit`}>
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
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="posts">
          <PostList data={user} />
        </TabsContent>
        <TabsContent value="exercises">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfilePage;
