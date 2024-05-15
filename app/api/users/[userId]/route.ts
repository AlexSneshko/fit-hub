import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    try {
        const { userId } = params;
        
        if (!userId) {
            return new NextResponse("Invalid user id", { status: 400 })
        }

        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        console.log("[USER_ID]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(req: Request, { params }: { params: { userId: string } }) {
    try {
        const { userId } = params;
        
        if (!userId) {
            return new NextResponse("Invalid user id", { status: 400 })
        }
        
        const { userId: authId } = auth();

        if (userId !== authId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const values = await req.json();
        const user = await db.user.update({
            where: {
                id: userId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.log("[USER_ID]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}