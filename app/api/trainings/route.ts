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

    const training = await db.training.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        ...values,
      },
    });

    return NextResponse.json(training);
  } catch (error) {
    console.log("[TRAININGS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
