"use client";

import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { useEffect, useState } from "react";
import { GymMembership } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { MembershipForm, membershipFormSchema } from "../../_components/membership-form";

const EditMembershipPage = ({params} : {params: {membershipId: string}}) => {
  const router = useRouter();
  const [membership, setMembership] = useState<GymMembership>();
  const { userId } = useAuth();

  const onEdit = async (data: z.infer<typeof membershipFormSchema>) => {
    try {
      const response = await axios.patch(
        `/api/memberships/${params.membershipId}`,
        data
      );
      router.push("/gym/memberships");
      toast.success("Promotion created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/memberships/${params.membershipId}`
      );
      router.push("/gym/memberships");
      toast.success("Promotion deleted");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    axios
      .get(`/api/memberships/${params.membershipId}`)
      .then((res) => {
        if (!res.data) {
          router.push("/gym/memberships");
        }
        if (res.data.gymId !== userId) {
          router.push("/");
        }
        setMembership(res.data);
      })
      .catch(() => {
        router.push(`/gym/memberships`);
      });
  }, [params.membershipId, router]);

  if (!membership) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto w-2/3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Membership</h1>
        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </Button>
      </div>
      <MembershipForm onSubmit={onEdit} membership={membership} />
    </div>
  );
}

export default EditMembershipPage