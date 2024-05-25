import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { gymId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { gymId } = params;

        if (userId !== gymId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const values = await req.json();

        const newGymOpenTime = await db.gymOpenTime.create({
            data: {
                ...values,
                gymId
            },
        });

        return NextResponse.json(newGymOpenTime);
    } catch (error) {
        console.log("[GYM_GYM_OPENTIME_ID]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { gymId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { gymId } = params;

        if (userId !== gymId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const values = await req.json();

        const newGymOpenTime = await db.gymOpenTime.update({
            where: {
                gymId,
            },
            data: {
                ...values,
            },
        });

        return NextResponse.json(newGymOpenTime);
    } catch (error) {
        console.log("[GYM_GYM_OPENTIME_ID]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}