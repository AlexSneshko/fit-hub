"use client";

import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  EquipmentForm,
  equipmentFormSchema,
} from "../_components/equipment-form";

const CreateEquipmentPage = () => {
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof equipmentFormSchema>) => {
    try {
      const response = await axios.post("/api/equipments", data);
      router.push("/gym/equipments");
      router.refresh()
      toast.success("Equipment created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mx-auto w-2/3">
      <h1 className="text-center text-2xl">Create Equipment</h1>
      <EquipmentForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreateEquipmentPage;
