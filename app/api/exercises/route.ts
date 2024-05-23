import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    values.category = { connect: { id: values.categoryId } };
    delete values.categoryId;

    const exercise = await db.exercise.create({
      data: {
        ...values,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(exercise);
  } catch (error) {
    console.log("[EXERCISES]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const exercises = await db.exercise.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(exercises);
  } catch (error) {
    console.log("[EXERCISES]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
