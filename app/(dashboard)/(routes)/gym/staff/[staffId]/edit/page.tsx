"use client";

import { z } from "zod";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { StaffForm, staffFormSchema } from "../../_components/staff-form";
import { useEffect, useState } from "react";
import { Staff } from "@prisma/client";
import { Button } from "@/components/ui/button";

const EditStaffPage = ({ params }: { params: { staffId: string } }) => {
  const router = useRouter();
  const [staff, setStaff] = useState<Staff>();
  const { userId } = useAuth();

  const onEdit = async (data: z.infer<typeof staffFormSchema>) => {
    try {
      const response = await axios.patch(`/api/staff/${params.staffId}`, data);
      router.push("/gym/staff");
      toast.success("Staff edited");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(`/api/staff/${params.staffId}`);
      router.push("/gym/staff");
      router.refresh()
      toast.success("Staff deleted");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    axios
      .get(`/api/staff/${params.staffId}`)
      .then((res) => {
        if (!res.data) {
          router.push("/gym/staff");
        }
        if (res.data.gymId !== userId) {
          router.push("/");
        }
        setStaff(res.data);
      })
      .catch(() => {
        router.push(`/gym/staff`);
      });
  }, [params.staffId, router]);

  if (!staff) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto w-2/3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Staff</h1>
        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </Button>
      </div>
      <StaffForm onSubmit={onEdit} staff={staff} />
    </div>
  );
};

export default EditStaffPage;
