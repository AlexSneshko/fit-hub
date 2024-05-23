"use client";

import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import {
  PromotionForm,
  promotionFormSchema,
} from "../../_components/promotion-form";
import { useEffect, useState } from "react";
import { Promotion } from "@prisma/client";
import { Button } from "@/components/ui/button";

const EditPromotionPage = ({ params }: { params: { promotionId: string } }) => {
  const router = useRouter();
  const [promotion, setPromotion] = useState<Promotion>();
  const { userId } = useAuth();

  const onEdit = async (data: z.infer<typeof promotionFormSchema>) => {
    try {
      const response = await axios.patch(
        `/api/promotions/${params.promotionId}`,
        data
      );
      router.push("/gym/promotions");
      toast.success("Promotion updated");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/promotions/${params.promotionId}`
      );
      router.push("/gym/promotions");
      toast.success("Promotion deleted");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    axios
      .get(`/api/promotions/${params.promotionId}`)
      .then((res) => {
        if (!res.data) {
          router.push("/gym/promotions");
        }
        if (res.data.gymId !== userId) {
          router.push("/");
        }
        setPromotion(res.data);
      })
      .catch(() => {
        router.push(`/gym/promotions`);
      });
  }, [params.promotionId, router]);

  if (!promotion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto w-2/3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Promotion</h1>
        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </Button>
      </div>
      <PromotionForm onSubmit={onEdit} promotion={promotion} />
    </div>
  );
};

export default EditPromotionPage;
