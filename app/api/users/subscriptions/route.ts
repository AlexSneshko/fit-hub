import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ProfileType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId: subscriberId } = auth();

    if (!subscriberId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userId: targetUserId, gymId: targetGymId } = await req.json();

    if (!targetUserId && !targetGymId) {
      return new NextResponse("Invalid target id", { status: 400 });
    }

    if (targetGymId) {
      const existingGymSubscription = await db.subscription.findFirst({
        where: {
          subscriber: {
            id: subscriberId,
          },
          targetGym: {
            id: targetGymId,
          },
        },
      });

      console.log(existingGymSubscription)

      if (existingGymSubscription) {
        return new NextResponse("Already subscribed", { status: 400 });
      }
  
      const gymSubscription = await db.subscription.create({
        data: {
          subscriptionType: ProfileType.GYM,
          subscriber: {
            connect: {
              id: subscriberId,
            },
          },
          targetGym: {
            connect: {
              id: targetGymId as string,
            },
          },
        },
      });

      return NextResponse.json(gymSubscription);
    }

    if (subscriberId === targetUserId) {
      return new NextResponse("Can't subscribe to yourself", { status: 400 });
    }

    const existingSubscription = await db.subscription.findFirst({
      where: {
        subscriber: {
          id: subscriberId,
        },
        targetUser: {
          id: targetUserId,
        },
      },
    });

    if (existingSubscription) {
      return new NextResponse("Already subscribed", { status: 400 });
    }

    const subscription = await db.subscription.create({
      data: {
        subscriptionType: ProfileType.USER,
        subscriber: {
          connect: {
            id: subscriberId,
          },
        },
        targetUser: {
          connect: {
            id: targetUserId as string,
          },
        },
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.log("[USER_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const subscriptions = await db.subscription.findFirst({
      where: {
        subscriber: {
          id: userId,
        },
      },
    });

    return NextResponse.json(subscriptions);
  } catch (error) {
    console.log("[SUBSCRIPTIONS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
