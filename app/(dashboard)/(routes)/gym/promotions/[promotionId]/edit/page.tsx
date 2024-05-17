"use client"

import { z } from "zod"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

import { PromotionForm, promotionFormSchema } from "../../_components/promotion-form"
import { useState } from "react"
import { Promotion } from "@prisma/client"

const EditPromotionPage = ({params: {promotionId}}: {params: {promotionId: string}}) => {
  const router = useRouter()
  const [promotion, setPromotion] = useState<Promotion>()

  const onSubmit = async (data: z.infer<typeof promotionFormSchema>) => {
      try {
        const response = await axios.patch(`/api/promotions/${promotionId}`, data);
        router.push("/gym/promotions");
        toast.success("Promotion created")
      } catch (error) {
        toast.error("Something went wrong")
      }
  }

  return (
    <div>
      <PromotionForm onSubmit={onSubmit} promotion={promotion} />
    </div>
  )
}

export default EditPromotionPage