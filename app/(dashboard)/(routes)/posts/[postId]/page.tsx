import EditorOutput from "@/components/editor-output";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ProfileType } from "@prisma/client";
import { redirect } from "next/navigation";

const PostIdPage = async ({ params }: { params: { postId: string } }) => {
  const { userId } = auth();

  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
  });

  if (!post) {
    redirect("/");
  }

  const isOwner =
    post.authorType === ProfileType.USER
      ? post.authorUserId === userId
      : post.authorGymId === userId;

    console.log(post)


  return (
    <div>
        <h1>{isOwner ? "Owner" : "Not owner"}</h1>
        <div className="px-40 py-10">
          
        <EditorOutput content={post?.content} />
        </div>
    </div>
  );
};

export default PostIdPage;
