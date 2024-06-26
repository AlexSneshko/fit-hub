"use client";

import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  PromotionForm,
  promotionFormSchema,
} from "../_components/promotion-form";

const CreatePromotionPaage = () => {
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof promotionFormSchema>) => {
    try {
      const response = await axios.post("/api/promotions", data);
      router.push("/gym/promotions");
      router.refresh()
      toast.success("Promotion created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mx-auto w-2/3">
      <h1 className="text-center text-2xl">Create Promotion</h1>
      <PromotionForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreatePromotionPaage;
