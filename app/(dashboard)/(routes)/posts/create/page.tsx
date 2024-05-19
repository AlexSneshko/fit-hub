"use client"

import { z } from "zod";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { PostForm, postFormSchema } from "../_components/post-form";

const CreatePostPage = () => {
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof postFormSchema>) => {
        try {
          const response = await axios.post("/api/posts", {...values});
          router.push(`/posts/${response.data.id}`);
          toast.success("Post created");
        } catch (error) {
          toast.error("Something went wrong");
        }
      };
    
  return (
    
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full mt-20 pb-20 px-6">
      <div className="w-full px-20">
        <h1 className="text-2xl">Create your post</h1>
        {/* <p className="text-sm text-slate-600">
          What would you like to tell about your exercise? Don&apos;t worry, you
          can change this later.
        </p> */}
        <PostForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default CreatePostPage