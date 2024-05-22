import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { Pencil } from "lucide-react";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";

export default async function EquipmentPage({
  params,
}: {
  params: { equipmentId: string };
}) {
  const { userId } = auth();
  const equipment = await db.equipment.findUnique({
    where: {
      id: params.equipmentId,
    },

  });

  if (!equipment) {
    notFound();
  }

  const isOwner = userId === equipment.gymId;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-semibold">{equipment.name}</h1>
        {isOwner && (
          <Link href={`/gym/equipments/${equipment.id}/edit`} className="ml-4">
            <Button variant="outline">
              <Pencil className="w-4 h-4 mr-2" /> Edit/Delete
            </Button>
          </Link>
        )}
      </div>
      {equipment.imageUrl && (
        <Image
          src={equipment.imageUrl}
          alt={equipment.name}
          width={600}
          height={400}
          className="object-cover rounded mb-4 mx-auto"
        />
      )}
      <div className="text-gray-700 text-base mb-4">
        {equipment.description}
      </div>
    </div>
  );
}
