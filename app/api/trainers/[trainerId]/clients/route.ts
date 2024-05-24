import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
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

    const trainer = await db.trainer.findUnique({
      where: {
        userId,
      },
    });

    if (!trainer) {
      return new NextResponse("Trainer not found", { status: 404 });
    }

    const clientUsers = await db.user.findMany({
      where: {
        trainers: {
          some: {
            trainerId: trainerId,
          },
        },
      },
    });

    return NextResponse.json(clientUsers);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
