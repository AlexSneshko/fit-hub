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

    if (values.userId) {
      const staff = await db.staff.findUnique({
        where: {
          userId: values.userId,
        },
      });

      if (staff) {
        return new NextResponse("Staff with this user already exists", {
          status: 409,
        });
      }

      values.user = { connect: { id: values.userId } };
      delete values.userId;
    }

    const newStaff = await db.staff.create({
      data: {
        gym: {
          connect: {
            id: userId,
          },
        },
        ...values,
      },
    });

    return NextResponse.json(newStaff);
  } catch (error) {
    console.log("[STAFF]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
