"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

const CreateTrainerPage = () => {
  const router = useRouter();

  const onUpgradeClick = async () => {
    try {
      const response = await axios.post("/api/trainer");
      router.push("/shared-trainings");
      toast.success(
        "You are upgraded to trainer, now you can share trainings!!🎉"
      );
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="ml-4">
      <h1 className="text-2xl font-semibold">Become a trainer</h1>
      <div className="flex justify-center items-center mt-5">
        <Button size="lg" onClick={onUpgradeClick}>
          Upgrage to trainer
        </Button>
      </div>
    </div>
  );
};

export default CreateTrainerPage;
