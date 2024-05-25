import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { gymId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const gym = await db.gym.update({
      where: {
        id: params.gymId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(gym);
  } catch (error) {
    console.log("[GYM_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { gymId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const gym = await db.gym.findUnique({
      where: {
        id: params.gymId,
      },
      include: {
        gymOpenTime: true
      },
    });
    
    return NextResponse.json(gym);
  } catch (error) {
    console.log("[GYM_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}