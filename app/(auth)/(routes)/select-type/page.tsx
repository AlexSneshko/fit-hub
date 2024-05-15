"use client"

import { toast } from "react-hot-toast";
import { AccountTypeInfo } from "./_components/account-type-info";
import axios from "axios";
import { useRouter } from "next/navigation";

const SelectTypePage = () => {
  const router = useRouter();

  const onUserTypeClick = async () => {
    try {
        const response = await axios.post('/api/users');
        toast.success("User profile created")
    } catch (error) {
        toast.error("Something went wrong");
    }
  }

  const onGymTypeClick = async () => {
    try {
        const response = await axios.post('/api/gyms');
        router.push("/sign-in")
        toast.success("User profile created")
    } catch (error) {
        toast.error("Something went wrong");
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-medium">Choose your account type </h1>
        <span className="font-light">be carefull, you can’t change it</span>
      </div>
      <div className="flex gap-x-10 mt-16">
        <AccountTypeInfo
          onClick={onUserTypeClick}
          label="User"
          description="Become part of our active fitness community, set your goals, and access tools to achieve success."
        />
        <AccountTypeInfo
          onClick={onUserTypeClick}
          label="Gym"
          description="Manage your fitness facility, attract more clients, and deliver high-quality services to your visitors."
        />
      </div>
    </div>
  );
};

export default SelectTypePage;
