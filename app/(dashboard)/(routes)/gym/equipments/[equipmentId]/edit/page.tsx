"use client";

import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { useEffect, useState } from "react";
import { Equipment } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { EquipmentForm, equipmentFormSchema } from "../../_components/equipment-form";

const EditEquipmentage = ({ params }: { params: { equipmentId: string } }) => {
  const router = useRouter();
  const [equipment, setEquipment] = useState<Equipment>();
  const { userId } = useAuth();

  const onEdit = async (data: z.infer<typeof equipmentFormSchema>) => {
    try {
      const response = await axios.patch(
        `/api/equipments/${params.equipmentId}`,
        data
      );
      router.push("/gym/equipments");
      toast.success("Equipment created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/equipments/${params.equipmentId}`
      );
      router.push("/gym/equipments?refresh=true");
      toast.success("Equipment deleted");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    axios
      .get(`/api/equipments/${params.equipmentId}`)
      .then((res) => {
        if (!res.data) {
          router.push("/gym/equipments");
        }
        if (res.data.gymId !== userId) {
          router.push("/");
        }
        setEquipment(res.data);
      })
      .catch(() => {
        router.push(`/gym/equipments`);
      });
  }, [params.equipmentId, router]);

  if (!equipment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto w-2/3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Equipment</h1>
        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </Button>
      </div>
      <EquipmentForm onSubmit={onEdit} equipment={equipment} />
    </div>
  );
};

export default EditEquipmentage;
