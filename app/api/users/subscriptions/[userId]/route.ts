import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userId: targetUserId } = await req.json();

    if (!targetUserId) {
      return new NextResponse("Invalid target user id", { status: 400 });
    }

    const subscription = await db.subscription.findFirst({
      where: {
        subscriber: {
          id: userId,
        },
        targetUser: {
          id: userId,
        },
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.log("[SUBSCRIPTIONS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
