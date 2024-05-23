import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { getRandomValues } from "crypto";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { trainerId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { trainerId } = params;

    if (userId !== trainerId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userId: userClientId } = await req.json();

    if (userClientId === trainerId) {
      return new NextResponse("User cannot be trainer", { status: 400 });
    }

    const userClient = await db.trainerClientRelationship.findUnique({
      where: {
        trainerId_clientId: {
          trainerId: trainerId,
          clientId: userClientId as string,
        },
      },
    });

    if (userClient) {
      return new NextResponse("User is already your client", { status: 409 });
    }

    const trainer = await db.trainerClientRelationship.create({
      data: {
        trainer: {
          connect: {
            userId: trainerId,
          },
        },
        client: {
          connect: {
            id: userClientId,
          },
        },
      },
    });

    return NextResponse.json(trainer);
  } catch (error) {
    console.log("[TRAINER_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
