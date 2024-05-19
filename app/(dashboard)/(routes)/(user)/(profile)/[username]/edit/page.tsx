"use client";

import { z } from "zod";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { User } from "@prisma/client";
import {
  UserForm,
  userFormSchema,
} from "../../_components/user-form";
import { ImageIcon, Pencil } from "lucide-react";
import Image from "next/image";;
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

const EditUserProfilePage = ({ params }: { params: { username: string } }) => {
  const router = useRouter();
  const { userId } = useAuth()

  const [user, setUser] = useState<User>();
  const [isEditingImage, setIsEditingImage] = useState(false);

  const toggleEdit = () => {
    setIsEditingImage((current) => !current);
  };

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((res) => {
        if (!res.data) {
          router.push(`/${params.username}`);
        }
        setUser(res.data);
      })
      .catch(() => {
        router.push(`/${params.username}`);
      });
  }, [params.username, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const onEditImage = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/users/${user.id}`, values);
      toast.success("Avatar updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onEditUser = async (data: z.infer<typeof userFormSchema>) => {
    try {
      const response = await axios.patch(`/api/users/${user.id}`, data);
      router.push(`/${params.username}`);
      toast.success("User profile updated");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex justify-center md:px-80">
        {!isEditingImage &&
          (!user.imageUrl ? (
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
                src={user.imageUrl}
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
        )}
        <Button variant="ghost" onClick={toggleEdit}>
          <Pencil className="w-4 h-4 mr-2" /> {isEditingImage ? "Cancel" : "Edit"}
        </Button>
      </div>
      <div className="md:px-80">
        <UserForm onSubmit={onEditUser} user={user} />
      </div>
    </div>
  );
};

export default EditUserProfilePage;
