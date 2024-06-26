import { AuthorWithPosts, PostWithAuthor } from "@/types/author";

import { PostCard } from "./post-card";

interface PostListProps {
  data: PostWithAuthor[];
}

export const PostList = ({ data }: PostListProps) => {
  if (data.length === 0) {
    return (
      <div className="w-hull mt-10 flex items-center justify-center">
        <h1>No Posts</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-6 items-center justify-center">
      {data.map(
        (post) =>
          (post.authorGym || post.authorUser) && (
            <PostCard
              key={post.id}
              data={post}
              author={post.authorGym || post.authorUser!}
            />
          )
      )}
    </div>
  );
};
