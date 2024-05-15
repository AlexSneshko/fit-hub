import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
      const { userId } = auth();
      const { title } = await req.json();

      if (!userId) {
        return new NextResponse("Unathorized", { status: 401 })
      }

      const data = await db.training.create({
        data:{
            userId,
            title
        }
      })

    //   const {} =  db.sharedTraining.create({
    //     data: {
    //         userId,
            
    //     }
    //   })

    } catch (error) {
        console.log("[COURSES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}