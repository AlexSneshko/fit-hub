"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { UserForm, userFormSchema } from "../_components/user-form";
import { useState } from "react";

const formSchema = z.object({
    imageUrl: z.string().min(1, {
      message: "Image is required",
    }),
  });

const CreatePage = () => {
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    try {
      const response = await axios.post("/api/users", values);
      router.push(`/${response.data.username}`);
      toast.success("Profile created");
    } catch (error) {
      toast.error("Failed to create profile");
    }
  };

  return (
    <div className="mx-auto md:px-96">
      <h1 className="text-center text-2xl">Create your profile</h1>
      <UserForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreatePage;
