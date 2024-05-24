"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Gym, Post, User } from "@prisma/client";

import { Avatar } from "../avatar";
import { formatTimeToNow, isUser } from "@/lib/utils";
import EditorOutput from "@/components/editor-output";

interface PostCardProps {
  data: Post;
  author: User | Gym;
}

export const PostCard = ({ data, author }: PostCardProps) => {
  const pRef = useRef<HTMLParagraphElement>(null);

  const [isBlurred, setIsBlurred] = useState(false);

  const isAuthorUser = isUser(author);

  useEffect(() => {
    const div = document.getElementById("contentDiv");
    if (div && div.scrollHeight > 200) {
      setIsBlurred(true);
    }
  }, []);

  return (
    <div className="md:w-[600px] rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <div className="flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            <Link
              href={
                isAuthorUser ? `/${author.username}` : `/gym/${author.username}`
              }
            >
              <div className="flex items-center gap-x-2">
                Posted by:
                <Avatar avatarUrl={author.imageUrl} imgSize={20} />
                <span>
                  {author.username} {formatTimeToNow(new Date(data.createdAt))}
                </span>
              </div>
            </Link>
          </div>
          <Link href={`/posts/${data.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {data.title}
            </h1>
            <div className="relative text-sm max-h-[200px] w-full overflow-clip pt-2">
              <EditorOutput content={data.content} />
              {/* {pRef.current?.clientHeight === 200 ? (
              // blur bottom if content is too long */}
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
              {/* ) : null} */}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
