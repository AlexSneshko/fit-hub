"use client";

import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const ProfileProvider = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { userId } = useAuth()

  useEffect(() => {
    axios.get(`/api/users/${userId}`).then((profile) => {
      if (!profile.data) {
        router.push("/select-type");
      }
    });
  }, [pathName, router, userId]);

  return null;
};

export default ProfileProvider;
