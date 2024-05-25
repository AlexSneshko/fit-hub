import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { gymId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { gymId } = params;

    if (userId !== gymId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { trainerId, role } = await req.json();

    const trainer = await db.user.findUnique({
      where: {
        id: trainerId,
      },
    });

    if (!trainer) {
      return new NextResponse("Trainer not found", { status: 404 });
    }

    const gym = await db.gymTrainerRelationship.create({
      data: {
        trainerId: trainer.id,
        gymId: gymId,
        role,
      },
    });

    return NextResponse.json(gym);
  } catch (error) {
    console.log("[GYM_TRAINER_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { gymId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { gymId } = params;

    if (userId !== gymId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const trainers = await db.gymTrainerRelationship.findMany({
      where: {
        gymId,
      },
      include: {
        trainer: {
          include: {
            user: true,
          },
        },
      },
    });

    const users = trainers.map(({ trainer }) => trainer.user);

    return NextResponse.json(users);
  } catch (error) {
    console.log("[GYM_TRAINER_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
