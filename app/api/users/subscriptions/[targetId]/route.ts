import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { targetId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.targetId) {
      return new NextResponse("Invalid target user id", { status: 400 });
    }

    const subscription = await db.subscription.findFirst({
      where: {
        subscriber: {
          id: userId,
        },
        targetUser: {
          id: params.targetId,
        },
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.log("[SUBSCRIPTIONS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { targetId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.targetId) {
      return new NextResponse("Invalid target id", { status: 400 });
    }

    const targetGym = await db.gym.findUnique({
      where: {
        id: params.targetId,
      },
    });

    if (targetGym) {
      const gymSubscribtion = await db.subscription.findFirst({
        where: {
          subscriberId: userId,
          targetGymId: params.targetId as string,
        },
      });

      if (!gymSubscribtion) {
        return new NextResponse("Subscription not found", { status: 404 });
      }
  
      const deletedGymSubscribtion = await db.subscription.delete({
        where: {
          id: gymSubscribtion.id,
        },
      });
  
      return NextResponse.json(deletedGymSubscribtion);
    }

    const subscribtion = await db.subscription.findFirst({
      where: {
        subscriberId: userId,
        targetUserId: params.targetId as string,
      },
    });

    if (!subscribtion) {
      return new NextResponse("Subscription not found", { status: 404 });
    }

    const deletedSubscribtion = await db.subscription.delete({
      where: {
        id: subscribtion.id,
      },
    });

    return NextResponse.json(deletedSubscribtion);
  } catch (error) {
    console.log("[SUBSCRIPTION_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
