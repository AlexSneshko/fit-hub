"use client"

import { useAuth } from "@clerk/nextjs"
import { ProfileType } from "@prisma/client"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const gymRoutes = [
  "/gym/crm",
  "/gym/staff",
  "/gym/memberships",
  "/gym/promotions",
  "/gym/equipments",
];

const userRoutes = [
  "/fitline",
  "/search",
  "/exercises",
  "/trainings",
  "/shared-trainings",
];

export const RegistrationProvider = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { userId } = useAuth();

  // if (userId && ((pathname === "/select-type" || pathname === "/create" || pathname === "/gym/create") && !gymRoutes.includes(pathname) && !userRoutes.includes(pathname))) {
  //   return null
  // }

  console.log(pathname)
  console.log(userId && !gymRoutes.includes(pathname) && !userRoutes.includes(pathname))

  if (userId && !gymRoutes.includes(pathname) && !userRoutes.includes(pathname)) {
    return null
  }

  if (userId && (pathname === "/select-type" || pathname === "/create" || pathname === "/gym/create")) {
    return null
  }

  // if (userId && (gymRoutes.includes(pathname) || userRoutes.includes(pathname))) {
  //   return null
  // }
// debugger;

  useEffect(() => {
    axios
      .get("/api/profile-type")
      .then((res) => {
        console.log(res.data)
        if (!res.data) {
          router.push("/select-type");
        }
      })
      .catch(() => {
        router.push("/select-type");
      });
  }, [pathname])  


  return null
}
