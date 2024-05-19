import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 409 });
    }

    const values = await req.json();

    const newUser = await db.user.create({
      data: {
        id: userId,
        ...values,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 })
    // }

    const users = await db.user.findMany({});

    return NextResponse.json(users);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
