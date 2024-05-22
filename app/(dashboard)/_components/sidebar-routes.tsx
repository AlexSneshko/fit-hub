"use client";

import {
  Bell,
  BookUser,
  Boxes,
  Dumbbell,
  HeartHandshake,
  Home,
  Layout,
  List,
  Search,
  User,
  UsersRound,
} from "lucide-react";

import { SidebarItem } from "./sidebar-item";

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
    href: "/gym/equipments",
  },
  {
    icon: UsersRound,
    label: "Staff",
    href: "/gym/staff",
  },
];

interface SidebarRoutesProps {
  username?: string;
  isTrainer?: boolean;
  isGym?: boolean;
}

export const SidebarRoutes = ({
  username,
  isTrainer,
  isGym,
}: SidebarRoutesProps) => {
  const profilePage = {
    icon: User,
    label: "Profile",
    href: isGym ? `/gym/${username}` : `/${username}`,
  };

  const routes = [profilePage, ...(isGym ? gymRoutes : userRoutes)];

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
