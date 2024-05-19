"use client";

import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const userRoutes = ["/fitline", "/search", "/trainings", "/exercises", "/notifications"];

const ProfileProvider = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { userId } = useAuth();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUserExistance = async () => {
    const user = await axios.get(`/api/users/${userId}`);
    const gym = await axios.get(`/api/gyms/${userId}`);

    if (!user.data && !gym.data && pathName !== "/gym/create" && pathName !== "/create") {
      router.push("/select-type");
    } 

    if (user.data && pathName === "/") {
      router.push(`/${user.data.username}`);
    }

    if (gym.data && pathName === "/") {
      router.push(`/gym/${gym.data.username}`);
    }

    if (gym.data && userRoutes.includes(pathName)) {
      router.back()
    }
  };

  useEffect(() => {
    // axios.get(`/api/users/${userId}`).then((profile) => {
    //   if (!profile.data) {
    //     router.push("/select-type");
    //   }
    // });
    checkUserExistance()
  }, [checkUserExistance, router, userId]);

  return null;
};

export default ProfileProvider;
