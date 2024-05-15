import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const training = await db.training.create({
      data: {
        title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    
    return NextResponse.json(training);
  } catch (error) {
    console.log("[TRAININGS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const trainings = await db.training.findMany({});
    console.log(trainings)

    console.log(userId)

    const training = await db.training.deleteMany({
        where: {
            userId: userId,
        }
    })

    console.log(training)

    return NextResponse.json(training)
    //return NextResponse.json(training)
  } catch (error) {
    console.log("[TRAININGS]", error);
    return new NextResponse("Intrernal Error", { status: 500 });
  }
}
