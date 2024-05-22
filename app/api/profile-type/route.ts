import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ProfileType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const gym = await db.gym.findUnique({
      where: {
        id: userId,
      },
    });

    if (gym) {
      return NextResponse.json({ user: ProfileType.GYM });
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      return NextResponse.json({ user: ProfileType.USER });
    }

    return new NextResponse("User not found", { status: 404 });
  } catch (error) {
    console.log("[USER_TYPE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
