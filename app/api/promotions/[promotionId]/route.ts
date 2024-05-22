import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { promotionId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { promotionId } = params;
        const values = await req.json();

        const promotion = await db.promotion.update({
            where: {
                id: promotionId
            },
            data: {
                ...values
            }
        })
        return NextResponse.json(promotion)
    } catch (error) {
        console.log("[PROMOTION_ID]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { promotionId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        
        const { promotionId } = params;

        const promotion = await db.promotion.findUnique({
            where: {
                id: promotionId
            }
        })
        
        return NextResponse.json(promotion)
    } catch (error) {
        console.log("[PROMOTION_ID]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { promotionId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { promotionId } = params;

        const promotion = await db.promotion.delete({
            where: {
                id: promotionId,
                gymId: userId
            }
        })
        
        return NextResponse.json(promotion)
    } catch (error) {
        console.log("[PROMOTION_ID]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}