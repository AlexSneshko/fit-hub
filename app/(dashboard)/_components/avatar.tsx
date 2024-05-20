import { User } from "lucide-react";
import Image from "next/image";

interface AvatarProps {
  avatarUrl: string | null | undefined;
  imgSize: number;
}

export const Avatar = ({ avatarUrl, imgSize }: AvatarProps) => {
  if (!avatarUrl) {
    return (
      <div
        className={`flex items-center justify-center h-${imgSize} w-${imgSize} bg-slate-200 rounded-full`}
      >
        <User className={`h-${imgSize - 4} w-${imgSize - 4} text-slate-500`} />
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
