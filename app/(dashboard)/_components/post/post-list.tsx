import { Post } from "@prisma/client"
import { PostCard } from "./post-card"
import { PostWithAuthor } from "@/types/post"

interface PostListProps {
  data: PostWithAuthor[]
}

export const PostList = ({
  data
}: PostListProps) => {
  return (
    <div className="flex flex-col gap-y-6 items-center justify-center">
      {data.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </div>
  )
}
