import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { gymId: string; clientId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { gymId, clientId } = params;

    if (userId !== gymId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const client = await db.user.findUnique({
      where: {
        id: clientId,
        client: {
          gymId: gymId,
        },
      },
    });

    if (!client) {
      return new NextResponse("Client not found", { status: 404 });
    }

    await db.gymClient.delete({
      where: {
        userId_gymId: {
          gymId,
          userId: clientId,
        },
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENT_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
