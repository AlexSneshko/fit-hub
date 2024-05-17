import { Promotion } from "@prisma/client"

interface PromotionCardProps {
    data: Promotion
}

export const PromotionCard = ({
    data
}: PromotionCardProps) => {
  return (
    <div>PromotionCard: {data.name}</div>
  )
}
