import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
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

    const { userId: userToShareId, trainingId } = await req.json();

    const userToShare = await db.user.findUnique({
      where: {
        id: userToShareId,
      },
    });

    if (!userToShare) {
      return new NextResponse("User not found", { status: 404 });
    }

    const trainer = await db.trainer.findUnique({
      where: {
        userId,
      },
    });

    if (!trainer) {
      return new NextResponse("Trainer not found", { status: 404 });
    }

    const training = await db.training.findUnique({
      where: {
        id: trainingId,
      },
    });

    if (!training) {
      return new NextResponse("Training not found", { status: 404 });
    }

    const sharedTraining = await db.sharedTraining.findUnique({
      where: {
        userId_trainingId: {
          userId: userToShareId,
          trainingId: trainingId,
        }
      },
    });

    if (sharedTraining) {
        return new NextResponse("User already has access to this training", { status: 400 });
    }

    const newSharedTraining = await db.sharedTraining.create({
      data: {
        trainer: {
          connect: {
            userId: trainerId,
          },
        },
        user: {
          connect: {
            id: userToShareId,
          },
        },
        training: {
          connect: {
            id: trainingId,
          },
        },
      },
    });

    return NextResponse.json(newSharedTraining);
  } catch (error) {
    console.log("[SHARED_TRAINING]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
