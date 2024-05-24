import { PostList } from "@/app/(dashboard)/_components/post/post-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const FitlinePage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const posts = await db.post.findMany({
    where: {
      OR: [
        {
          authorUser: {
            subscribers: {
              some: {
                subscriberId: userId,
              },
            },
          },
        },
        {
          authorGym: {
            subscribers: {
              some: {
                subscriberId: userId,
              },
            },
          },
        },
      ],
    },
    include: {
      authorUser: true,
      authorGym: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(posts);

  return (
    <div className="px-6">
      <h1 className="text-2xl font-semibold text-center mb-4">Fitline</h1>
      <PostList data={posts} />
    </div>
  );
};

export default FitlinePage;
