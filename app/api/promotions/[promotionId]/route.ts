// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";

// import { db } from "@/lib/db";

// export async function DELETE(req: Request, { params }: { params: { promotionId: string } }) {
//     try {
//         const { userId } = auth();
//         const { promotionId } = params;
//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 })
//         }
//         const promotion = await db.promotion.delete({
//             where: {
//                 id: promotionId
//             }
//         })

//         return NextResponse.json(promotion)
//     } catch (error) {
//         console.log("[PROMOTION_ID]", error);
//         return new NextResponse("Internal error", { status: 500 })
//     }
// }