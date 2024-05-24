import { UserCard } from "@/app/(dashboard)/_components/user/user-card";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ClientList } from "./_components/client-list";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AddClientDialog } from "./_components/add-client-dialog";

const ClientsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const trainerWithClients = await db.trainer.findUnique({
    where: {
      userId,
    },
    include: {
      clients: {
        include: {
          client: {
            include: {
              subscribers: true,
            },
          },
        },
      },
    },
  });

  if (!trainerWithClients) {
    redirect("/");
  }

  return (
    <div>
      <div className="flex items-center justify-between px-4 mb-6">
        <h1 className="text-2xl font-semibold">Clients</h1>

        <AddClientDialog trainerId={trainerWithClients.userId} />
      </div>
      <ClientList data={trainerWithClients} />
    </div>
  );
};

export default ClientsPage;
