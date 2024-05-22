import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";

export default async function PromotionPage({
  params,
}: {
  params: { promotionId: string };
}) {
  const { userId } = auth();
  const promotion = await db.promotion.findUnique({
    where: {
      id: params.promotionId,
    },
    include: {
      gym: true,
    },
  });

  if (!promotion) {
    notFound();
  }

  const authorName = promotion.gym.username;

  const isActive =
    new Date() >= new Date(promotion.firstDate) &&
    new Date() <= new Date(promotion.lastDate);

  const isOwner = userId === promotion.gymId;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-semibold">{promotion.name}</h1>
        {isOwner && (
          <Link href={`/gym/promotions/${promotion.id}/edit`} className="ml-4">
            <Button variant="outline">
              <Pencil className="w-4 h-4 mr-2" /> Edit/Delete
            </Button>
          </Link>
        )}
      </div>
      {promotion.imageUrl && (
        <Image
          src={promotion.imageUrl}
          alt={promotion.name}
          width={600}
          height={400}
          className="object-cover rounded mb-4 mx-auto"
        />
      )}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="block text-sm text-gray-600">
            Period: {format(new Date(promotion.firstDate), "PPP")} -{" "}
            {format(new Date(promotion.lastDate), "PPP")}
          </span>
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <div>
          <Link
            href={`/gym/${authorName}`}
            className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
          >
            {authorName}
          </Link>
        </div>
      </div>
      <div className="text-gray-700 text-base mb-4">
        {promotion.description}
      </div>
    </div>
  );
}
