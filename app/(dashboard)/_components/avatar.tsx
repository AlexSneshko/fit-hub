import { User } from "lucide-react";
import Image from "next/image";

interface AvatarProps {
  avatarUrl: string | null | undefined;
  imgSize: number;
}

export const Avatar = ({ avatarUrl, imgSize }: AvatarProps) => {
  const sizeStyle = {
    width: `${imgSize}px`,
    height: `${imgSize}px`,
  };

  if (!avatarUrl) {
    return (
      <div
        style={sizeStyle}
        className="flex items-center justify-center bg-slate-200 rounded-full"
      >
        <User className="text-slate-500" size={imgSize * 0.6} />
      </div>
    );
  }

  return (
    <div style={sizeStyle} className="relative rounded-full overflow-hidden">
      <Image
        alt="Avatar"
        src={avatarUrl}
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  );
};
