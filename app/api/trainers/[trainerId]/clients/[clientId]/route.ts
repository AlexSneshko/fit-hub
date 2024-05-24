import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { trainerId: string, clientId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { trainerId, clientId } = params;

        if (userId !== trainerId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const trainer = await db.trainer.findUnique({
            where: {
                userId
            },
            include: {
                clients: true
            }
        });

        if (!trainer) {
            return new NextResponse("Trainer not found", { status: 404 });
        }

        const client = trainer.clients.find(client => client.clientId === clientId);

        if (!client) {
            return new NextResponse("Client not found", { status: 404 });
        }

        const removedClient = await db.trainerClientRelationship.delete({
            where: {
                trainerId_clientId: {
                    trainerId,
                    clientId
                }
            }
        });

        if (removedClient) {
            await db.sharedTraining.deleteMany({
                where: {
                    trainerId,
                    userId: clientId,
                }
            })
        }

        return NextResponse.json(client);
    } catch (error) {
        console.log("[CLIENT_ID]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}