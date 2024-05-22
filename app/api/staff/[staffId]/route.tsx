import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { staffId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { staffId } = params;
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
      }

    const newStaff = await db.staff.update({
      where: {
        id: staffId,
        gymId: userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(newStaff);
  } catch (error) {
    console.log("[STAFF_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { staffId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { staffId } = params;

    const staff = await db.staff.findUnique({
      where: {
        id: staffId,
      },
    });

    return NextResponse.json(staff);
  } catch (error) {
    console.log("[STAFF_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { staffId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { staffId } = params;

    const staff = await db.staff.delete({
      where: {
        id: staffId,
        gymId: userId,
      },
    });

    return NextResponse.json(staff);
  } catch (error) {
    console.log("[STAFF_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
