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

    const membeship = await db.gymMembership.create({
      data: {
        gym: {
          connect: {
            id: userId,
          },
        },
        ...values,
      },
    });

    return NextResponse.json(membeship);
  } catch (error) {
    console.log("[GYM_MEMBERSHIPS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
