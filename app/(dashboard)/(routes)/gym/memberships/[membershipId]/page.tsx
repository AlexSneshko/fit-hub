import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";

import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";

const MembershipIdPage = async ({
  params,
}: {
  params: { membershipId: string };
}) => {
  const { userId } = auth();

  const membership = await db.gymMembership.findUnique({
    where: {
      id: params.membershipId,
    },
  });

  if (!membership) {
    return notFound();
  }

  const isOwner = membership.gymId === userId;

  return (
    <div className="w-2/3 mx-auto flex flex-col gap-y-10">
      <div className="flex items-center gap-x-4">
        <h1 className="font-semibold text-3xl">{membership.name}</h1>
        {isOwner && (
          <Link href={`/gym/memberships/${membership.id}/edit`}>
            <Button type="button" variant={"outline"} className="ml-2">
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </Button>
          </Link>
        )}
      </div>
      <p className="text-gray-700 text-base">{membership.description}</p>
      <p className="text-gray-900 text-xl font-semibold">
        Price: ${membership.price.toFixed(2)}
      </p>
    </div>
  );
};

export default MembershipIdPage;
