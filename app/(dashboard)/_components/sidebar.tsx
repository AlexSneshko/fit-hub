import Link from "next/link";
import { LogOut } from "lucide-react";
import { UserButton, auth } from "@clerk/nextjs";

import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { SidebarRoutes } from "./sidebar-routes";
import { db } from "@/lib/db";

export const Sidebar = async () => {
  const { userId } = auth();

  let username: string | undefined;
  let isTrainer: boolean | undefined;
  let isGym: boolean | undefined;

  if (userId) {
    const gym = await db.gym.findUnique({
      where: {
        id: userId,
      },
    });

    if (gym) {
      isGym = true;
      username = gym.username;
    } else {
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
      });

      username = user?.username;
      isTrainer = user?.isTrainer;
    }
  }

  return (
    <nav className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes username={username} isTrainer={isTrainer} isGym={isGym} />
      </div>
      <div className="flex items-center mt-auto gap-x-2 p-5 pb-8">
        <Link href="/">
          <Button size="sm" variant="ghost" className="text-slate-500">
            <LogOut className="w-4 h-4 mr-2" />
            Exit
          </Button>
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};
