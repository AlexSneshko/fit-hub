"use client";

import { BarChart, Bell, Compass, Dumbbell, DumbbellIcon, Home, Layout, List, Search, User } from "lucide-react";

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
    icon: List,
    label: "Shared Trainings",
    href: "/gym/sharedTrainings",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/gym/analytics",
  },
]

interface SidebarRoutesProps {
  userId: string | null;
}

export const SidebarRoutes = ({
  userId
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
    href: isGymPage ? `/gym/${userId}` : `/${userId}`,
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
