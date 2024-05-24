"use client";

import { z } from "zod";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { StaffForm, staffFormSchema } from "../_components/staff-form";

const CreateStaffPage = () => {
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof staffFormSchema>) => {
    try {
      const response = await axios.post("/api/staff", data);
      router.push("/gym/staff");
      router.refresh()
      toast.success("Staff created");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="mx-auto w-2/3">
      <h1 className="text-center text-2xl">Create Staff</h1>
      <StaffForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreateStaffPage;
