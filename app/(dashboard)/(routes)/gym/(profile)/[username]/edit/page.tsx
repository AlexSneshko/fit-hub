"use client";

import { useRouter } from "next/navigation";
import { GymForm, gymFormSchema } from "../../_components/gym-form";
import axios from "axios";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Gym } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";

const EditUserPage = ({ params }: { params: { username: string } }) => {
  const router = useRouter();
  const { userId } = useAuth()

  const [gym, setGym] = useState<Gym>();
  const [isEditingImage, setIsEditingImage] = useState(false);

  const onEdit = async (values: z.infer<typeof gymFormSchema>) => {
    try {
      const response = await axios.patch(`/api/gyms/${userId}`, values);
      router.push(`/gym/${params.username}`);
      toast.success("Gym updated");
    } catch (error) {
      toast.error("Failed to update gym");
    }
  };

  useEffect(() => {
    axios
      .get(`/api/gyms/${userId}`)
      .then((res) => {
        if (!res.data) {
          router.push(`/gym/${params.username}`);
        }
        setGym(res.data);
      })
      .catch(() => {
        router.push(`/${params.username}`);
      });
  }, [params.username, router]);

  if (!gym) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto w-2/3">
        {/* {!isEditingImage &&
          (!gym.imageUrl ? (
            <div className="flex items-center justify-center h-32 w-32 bg-slate-200 rounded-full">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative aspect-video mt-2">
              <Image
                alt="Upload"
                width={128}
                height={128}
                className="rounded-full h-32 w-32"
                src={gym.imageUrl}
              />
            </div>
          ))}
        {isEditingImage && (
          <div className="aspect-video mt-2 h-[244px] mb-10 mx-auto">
            <FileUpload
              endpoint="imageUploader"
              onChange={(url) => {
                if (url) {
                  onEditImage({ imageUrl: url });
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4">
              1:1 aspect ratio recommended
            </div>
          </div>
        )} */}
      <GymForm onSubmit={onEdit} gym={gym}/>
    </div>
  );
};

export default EditUserPage;
