import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { EquipmentList } from "@/app/(dashboard)/_components/equipment/equipment-list";

const EquipmentsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const gymWithEquipments = await db.gym.findUnique({
    where: {
      id: userId,
    },
    include: {
      equipment: true,
    },
  });

  if (!gymWithEquipments) {
    redirect("/");
  }

  return (
    <div>
      <div className="flex items-center justify-between px-4 mb-6">
        <h1 className="text-2xl font-semibold">Equipments</h1>
        <Link href="/gym/equipments/create">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" /> Equipment
          </Button>
        </Link>
      </div>
      <EquipmentList data={gymWithEquipments} />
    </div>
  );
}

export default EquipmentsPage