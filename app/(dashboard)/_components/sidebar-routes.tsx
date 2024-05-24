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
  Share2,
  User,
  UsersRound,
} from "lucide-react";

import { SidebarItem } from "./sidebar-item";

const userRoutes = [
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
  }
];

const trainerRoutes = [
  {
    icon: Share2,
    label: "Shared Trainings",
    href: "/shared-trainings",
  },
  {
    icon: UsersRound,
    label: "Clients",
    href: "/clients",
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

  const routes = [
    profilePage,
    ...(isGym
      ? gymRoutes
      : userRoutes),
  ];

  if (isTrainer) {
    routes.splice(5, 0, ...trainerRoutes)
  }

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
