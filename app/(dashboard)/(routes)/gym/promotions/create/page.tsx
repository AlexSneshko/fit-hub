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
      toast.success("Promotion created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <PromotionForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreatePromotionPaage;
