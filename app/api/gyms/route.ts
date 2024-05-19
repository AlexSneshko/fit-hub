import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const gym = await db.gym.findUnique({
            where: {
                id: userId,
            },
        });

        if (gym) {
            return new NextResponse("Gym already exists", { status: 409 });
        }

        const values = await req.json();

        const newGym = await db.gym.create({
            data: {
                id: userId,
                username: userId,
                ...values,
            },
        });

        return NextResponse.json(newGym);
    }
    catch (error) {
        console.log("[GYMS]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET() {
    try {
        const gyms = await db.gym.findMany();
        
        return NextResponse.json(gyms);
    }
    catch (error) {
        console.log("[GYMS]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
