"use client";

import { BarChart, Bell, BookUser, Boxes, Compass, Dumbbell, DumbbellIcon, HeartHandshake, Home, Layout, List, Search, User, UsersRound } from "lucide-react";

import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const userRoutes = [
  // {
  //   icon: User,
  //   label: "Profile",
  //   href: "/",
  // },
  {
    icon: Home,
    label: "Fitline",
    href: "/fitline",
  },
  {
    icon: Search,
    label: "Search",
    href: "/search",
  },
  {
    icon: Layout,
    label: "Trainings",
    href: "/trainings",
  },
  {
    icon: Dumbbell,
    label: "Exercises",
    href: "/exercises",
  },
  {
    icon: Bell,
    label: "Notifications",
    href: "/notifications",
  },
];

const gymRoutes = [
  {
    icon: BookUser,
    label: "CRM",
    href: "/gym/crm",
  },
  {
    icon: List,
    label: "Promotions",
    href: "/gym/promotions",
  },
  {
    icon: HeartHandshake,
    label: "Memberships",
    href: "/gym/memberships",
  },
  {
    icon: Boxes,
    label: "Equipment",
    href: "/gym/equipment",
  },
  {
    icon: UsersRound,
    label: "Staff",
    href: "/gym/staff",
  },
]

interface SidebarRoutesProps {
  userId: string | null;
  username?: string;
  isTrainer?: boolean;
}

export const SidebarRoutes = ({
  userId,
  username,
  isTrainer
}: SidebarRoutesProps) => {
  const pathname = usePathname();

  // const isGym = userId ? db.gym.findUnique({
  //   where: {
  //     id: userId
  //   }
  // }) : undefined;
  const isGymPage = pathname?.includes("/gym");


  const profilePage = {
    icon: User,
    label: "Profile",
    href: isGymPage ? `/gym/${username}` : `/${userId}`,
  };
  
  const routes = [profilePage, ...(isGymPage ? gymRoutes : userRoutes)]
  // const routes = userRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
