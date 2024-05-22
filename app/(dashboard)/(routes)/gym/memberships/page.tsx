import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { MembershipList } from "@/app/(dashboard)/_components/membership/membership-list";

const MembershipsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const gymWithMemberships = await db.gym.findUnique({
    where: {
      id: userId,
    },
    include: {
      gymMemberships: true,
    },
  });

  if (!gymWithMemberships) {
    redirect("/");
  }

  return (
    <div>
      <div className="flex items-center justify-between px-4 mb-6">
        <h1 className="text-2xl font-semibold">Memberships</h1>
        <Link href="/gym/memberships/create">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" /> Membership
          </Button>
        </Link>
      </div>
      <MembershipList data={gymWithMemberships} />
    </div>
  );
}

export default MembershipsPage