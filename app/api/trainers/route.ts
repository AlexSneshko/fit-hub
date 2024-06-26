import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const trainer = await db.trainer.findUnique({
      where: {
        userId: userId,
      },
      include: {
        sharedTrainings: {
          include: {
            user: true
          }
        }
      },
    });

    if (trainer) {
      return new NextResponse("Trainer already exists", { status: 409 });
    }

    const newTrainer = await db.trainer.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (newTrainer) {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          isTrainer: true,
        },
      });
    }

    return NextResponse.json(newTrainer);
  } catch (error) {
    console.log("[TRAINER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const trainers = await db.trainer.findMany({
      include: {
        user: true,
      }
    });

    return NextResponse.json(trainers);
  } catch (error) {
    console.log("[TRAINER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
