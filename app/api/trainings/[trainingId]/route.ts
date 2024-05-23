import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { trainingId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const training = await db.training.findUnique({
      where: {
        id: params.trainingId,
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    return NextResponse.json(training);
  } catch (error) {
    console.log("[TRAINING_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { trainingId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const training = await db.training.findUnique({
      where: {
        id: params.trainingId,
      },
    });

    if (!training) {
      return new NextResponse("Training not found", { status: 404 });
    }

    const values = await req.json();

    const updatedTraining = await db.training.update({
      where: {
        id: params.trainingId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(updatedTraining);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
