"use client"

import { useRouter } from "next/navigation";
import { z } from "zod";
import { MembershipForm, membershipFormSchema } from "../_components/membership-form";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreateMembershipPage = () => {
    const router = useRouter();

    const onSubmit = async (data: z.infer<typeof membershipFormSchema>) => {
      try {
        const response = await axios.post("/api/memberships", data);
        router.push("/gym/memberships?refresh=true");
        toast.success("Memberships created");
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
  
    return (
      <div className="mx-auto w-2/3">
        <h1 className="text-center text-2xl">Create Membership</h1>
        <MembershipForm onSubmit={onSubmit} />
      </div>
    );
}

export default CreateMembershipPage