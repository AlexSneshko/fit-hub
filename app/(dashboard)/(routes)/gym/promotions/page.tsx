import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { PromotionList } from "./_components/promotion-list";

const PromotionsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const gymWithPromotions = await db.gym.findUnique({
    where: {
      id: userId,
    },
    include: {
      promotions: true,
    },
  });

  if (!gymWithPromotions) {
    redirect("/");
  }

  return (
    <div>
      <Link href="/gym/promotions/create">
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" /> Promotion
        </Button>
      </Link>
      <PromotionList data={gymWithPromotions} />
    </div>
  );
};

export default PromotionsPage;
