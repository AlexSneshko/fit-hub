import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

// export async function GET(
//     req: Request,
//     { params }: { params: { trainingId: string; exerciseId: string } }
// ) {
//     try {
//         const { userId } = auth();

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }

//         const exercise = await db.exercise.findUnique({
//             where: {
//                 id: params.exerciseId,
//             },
//         });

//         return NextResponse.json(exercise);
//     } catch (error) {
//         console.log("[EXERCISE_ID]", error);
//         return new NextResponse("Internal Error", { status: 500 });
//     }
// }

export async function DELETE(
  req: Request,
  { params }: { params: { trainingId: string; exerciseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const exercise = await db.exerciseInTraining.delete({
      where: {
        exerciseId_trainingId: {
          exerciseId: params.exerciseId,
          trainingId: params.trainingId,
        },
        exercise: {
          userId,
        },
        training: {
          userId,
        },
      },
    });

    const trainingWithExercises = await db.training.findUnique({
      where: {
        id: params.trainingId,
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    return NextResponse.json(trainingWithExercises);
  } catch (error) {
    console.log("[EXERCISE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
