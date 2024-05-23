import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { exerciseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { exerciseId } = params;

    if (!exerciseId) {
      return new NextResponse("Invalid exercise id", { status: 400 });
    }

    const exercise = await db.exercise.findFirst({
      where: {
        id: exerciseId,
        userId,
      },
    });

    return NextResponse.json(exercise);
  } catch (error) {
    console.log("[EXERCISE_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { exerciseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { exerciseId } = params;

    if (!exerciseId) {
      return new NextResponse("Invalid exercise id", { status: 400 });
    }

    const values = await req.json();
    const exercise = await db.exercise.update({
      where: {
        id: exerciseId,
        userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(exercise);
  } catch (error) {
    console.log("[EXERCISE_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { exerciseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { exerciseId } = params;

    if (!exerciseId) {
      return new NextResponse("Invalid exercise id", { status: 400 });
    }

    const exercise = await db.exercise.delete({
      where: {
        id: exerciseId,
        userId,
      },
    });
    return NextResponse.json(exercise);
  } catch (error) {
    console.log("[EXERCISE_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
