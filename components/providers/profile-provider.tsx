"use client";

import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const ProfileProvider = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { userId } = useAuth();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUserExistance = async () => {
    const user = await axios.get(`/api/users/${userId}`);
    const gym = await axios.get(`/api/gyms/${userId}`);

    if (!user.data && !gym.data) {
      router.push("/select-type");
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
