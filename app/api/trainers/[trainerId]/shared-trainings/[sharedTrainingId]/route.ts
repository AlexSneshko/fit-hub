import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { trainerId: string, sharedTrainingId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { trainerId, sharedTrainingId } = params;

        if (userId !== trainerId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const trainer = await db.trainer.findUnique({
            where: {
                userId
            },
            include: {
                sharedTrainings: true,
                clients: true
            }
        });

        if (!trainer) {
            return new NextResponse("Trainer not found", { status: 404 });
        }

        const sharedTraining = trainer.sharedTrainings.find(sharedTraining => sharedTraining.trainingId === sharedTrainingId);

        if (!sharedTraining) {
            return new NextResponse("Shared training not found", { status: 404 });
        }

        const { clientId } = await req.json();

        const client = trainer.clients.find(client => client.clientId === clientId);

        if (!client) {
            return new NextResponse("Client not found", { status: 404 });
        }

        const sharedTrainingToDelete = await db.sharedTraining.delete({
            where: {
                userId_trainingId: {
                    trainingId: sharedTrainingId,
                    userId: clientId
                }
            },
        });

        return NextResponse.json(sharedTrainingToDelete);
    } catch (error) {
        console.log("[SHARED_TRAINING_ID]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}