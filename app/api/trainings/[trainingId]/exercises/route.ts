import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { trainingId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();
    const { exerciseId } = values;

    if (!exerciseId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const exerciseInTraining = await db.exerciseInTraining.findUnique({
      where: {
        exerciseId_trainingId: {
          exerciseId,
          trainingId: params.trainingId,
        }
      },
    });

    if (exerciseInTraining) {
        return new NextResponse("Exercise already in training", { status: 400 });
    }

    const newExerciseInTraining = await db.exerciseInTraining.create({
      data: {
        training: {
          connect: {
            id: params.trainingId,
          },
        },
        exercise: {
          connect: {
            id: exerciseId,
          },
        },
      },
      include: {
        training: {
          include: {
            exercises: {
              include: {
                exercise: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(newExerciseInTraining.training);
  } catch (error) {
    console.log("[EXERCISES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { trainingId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const training = await db.training.findMany({
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
    console.log("[EXERCISES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
