import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { membershipId: string } }) {
    try {
        const { userId } = auth();
        const { membershipId } = params;
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const values = await req.json();
        const membeship = await db.gymMembership.update({
            where: {
                id: membershipId
            },
            data: {
                ...values
            }
        })
        return NextResponse.json(membeship)
    } catch (error) {
        console.log("[MEMBERSHIP_ID]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { membershipId: string } }) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const { membershipId } = params;

        const membeship = await db.gymMembership.findUnique({
            where: {
                id: membershipId
            }
        })
        return NextResponse.json(membeship)
    } catch (error) {
        console.log("[MEMBERSHIP_ID]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { membershipId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { membershipId } = params;

        const membership = await db.gymMembership.delete({
            where: {
                id: membershipId,
                gymId: userId
            }
        })
        
        return NextResponse.json(membership)
    } catch (error) {
        console.log("[MEMBERSHIP_ID]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}