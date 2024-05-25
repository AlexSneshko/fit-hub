import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { gymId: string; trainerId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { gymId, trainerId } = params;

    if (userId !== gymId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const trainer = await db.user.findUnique({
      where: {
        id: trainerId,
      },
    });

    if (!trainer) {
      return new NextResponse("Trainer not found", { status: 404 });
    }

    await db.gymTrainerRelationship.deleteMany({
      where: {
        trainerId: trainerId,
        gymId: gymId,
      },
    });

    return NextResponse.json(trainer);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
