"use client";

import { useEffect, useRef, useState } from "react";

import EditorOutput from "@/components/editor-output";
import { formatTimeToNow, isAuthorGym, isAuthorUser } from "@/lib/utils";
import { AuthorWithProfileInfo } from "@/types/author";
import { Gym, Post, User } from "@prisma/client";

interface PostCardProps {
  data: Post;
  authorName: string;
}

export const PostCard = ({ data, authorName }: PostCardProps) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  console.log(data);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const div = document.getElementById("contentDiv");
    if (div && div.scrollHeight > 200) {
      setIsBlurred(true);
    }
  }, []);

  return (
    <div className="w-[600px] rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <div className="flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            <span>
              Posted by User: {authorName}{" "}
              {formatTimeToNow(new Date(data.createdAt))}
            </span>
          </div>
          <a href={``}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {data.title}
            </h1>
          </a>
          <div className="relative text-sm max-h-[200px] w-full overflow-clip pt-2">
            <EditorOutput content={data.content} />
            {/* {pRef.current?.clientHeight === 200 ? (
              // blur bottom if content is too long */}
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            {/* ) : null} */}
          </div>
        </div>
      </div>

      {/* // <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
      //   <Link
      //     href={`/r/${subredditName}/post/${post.id}`}
      //     className="w-fit flex items-center gap-2"
      //   >
      //     <MessageSquare className="h-4 w-4" /> {commentAmt} comments
      //   </Link> 
      // </div>  */}
    </div>
  );
};
