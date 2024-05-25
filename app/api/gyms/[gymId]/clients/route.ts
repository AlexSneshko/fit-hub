import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { gymId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { gymId } = params;

    if (userId !== gymId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const gym = await db.gym.findUnique({
      where: {
        id: gymId,
      },
    });

    if (!gym) {
      return new NextResponse("Gym not found", { status: 404 });
    }

    const { userId: clientId } = await req.json();

    const client = await db.user.findUnique({
      where: {
        id: clientId,
      },
      include: {
        client: true,
      }
    });

    if (!client) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (client.client?.gymId === gymId) {
      return new NextResponse("Client already exists", { status: 400 });
    }
    
    const newClient = await db.gymClient.create({
      data: {
        gym: {
          connect: {
            id: gymId,
          },
        },
        user: {
          connect: {
            id: clientId,
          },
        },
      },
    });

    return NextResponse.json(newClient);
  } catch (error) {
    console.log("[GYM_CLIENT_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
