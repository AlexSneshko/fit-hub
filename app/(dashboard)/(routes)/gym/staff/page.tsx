import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { StaffList } from "@/app/(dashboard)/_components/staff/staff-list";

const StaffPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const gymWithStaff = await db.gym.findUnique({
    where: {
      id: userId,
    },
    include: {
      staff: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!gymWithStaff) {
    redirect("/");
  }

  return (
    <div>
      <div className="flex items-center justify-between px-4 mb-6">
        <h1 className="text-2xl font-semibold">Staff</h1>
        <Link href="/gym/staff/create">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" /> Staff
          </Button>
        </Link>
      </div>
      <StaffList data={gymWithStaff} />
    </div>
  );
}

export default StaffPage