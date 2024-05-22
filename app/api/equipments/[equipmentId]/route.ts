import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { equipmentId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { equipmentId } = params;

    const values = await req.json();

    const equipment = await db.equipment.update({
      where: {
        id: equipmentId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(equipment);
  } catch (error) {
    console.log("[PROMOTION_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { equipmentId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { equipmentId } = params;

    const equipment = await db.equipment.findUnique({
      where: {
        id: equipmentId,
      },
    });
    return NextResponse.json(equipment);
  } catch (error) {
    console.log("[PROMOTION_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { equipmentId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { equipmentId } = params;

    const equipment = await db.equipment.delete({
      where: {
        id: equipmentId,
        gymId: userId,
      },
    });

    return NextResponse.json(equipment);
  } catch (error) {
    console.log("[PROMOTION_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
