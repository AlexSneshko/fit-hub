import { User } from "lucide-react";
import Image from "next/image";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  imgSize: number;
}

export const UserAvatar = ({ avatarUrl, imgSize }: UserAvatarProps) => {
  if (!avatarUrl) {
    return (
      <div
        className={`flex items-center justify-center h-${imgSize} min-w-${imgSize} bg-slate-200 rounded-full`}
      >
        <User className={`h-${imgSize - 8} w-${imgSize - 8} text-slate-500`} />
      </div>
    );
  }
  return (
    <div className={`relative aspect-video w-${imgSize} h-${imgSize}`}>
      <Image
        alt="Avatar"
        fill
        className={`rounded-full`}
        src={avatarUrl}
      />
    </div>
  );
};
