import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ProfileType } from "@prisma/client";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const author =
      values.authorType === ProfileType.USER ? "authorUser" : "authorGym";

    const post = await db.post.create({
      data: {
        ...values,
        [author]: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POSTS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

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

    const authorId = gym ? "authorGymId" : "authorUserId";
    const author = gym ? "authorGym" : "authorUser";

    const posts = await db.post.findMany({
      where: {
        [authorId]: userId,
      },
      include: {
        [author]: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.log("[POSTS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
