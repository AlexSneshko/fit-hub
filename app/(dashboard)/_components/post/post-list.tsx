import { AuthorWithPosts, AuthorWithProfileInfo } from "@/types/author"

import { PostCard } from "./post-card"

interface PostListProps {
  data: AuthorWithPosts
}

export const PostList = ({
  data
}: PostListProps) => {
  if (data.posts.length === 0) {
    return (
      <div className="w-hull mt-10 flex items-center justify-center">
        <h1>No Posts</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-6 items-center justify-center">
      {data.posts.map((post) => (
        <PostCard key={post.id} data={post} authorName={data.username}/>
      ))}
    </div>
  )
}
