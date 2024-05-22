import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { PromotionList } from "../../../_components/promotion/promotion-list";

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
      <div className="flex items-center justify-between px-4 mb-6">
        <h1 className="text-2xl font-semibold">Promotions</h1>
        <Link href="/gym/promotions/create">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" /> Promotion
          </Button>
        </Link>
      </div>
      <PromotionList data={gymWithPromotions} />
    </div>
  );
};

export default PromotionsPage;
