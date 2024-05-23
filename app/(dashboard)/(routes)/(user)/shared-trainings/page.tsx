import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SharedTrainingsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const trainer = await db.trainer.findUnique({
    where: {
      userId,
    },
    include: {
      sharedTrainings: true,
    },
  });

  return <div>SharedTrainingsPage</div>;
};

export default SharedTrainingsPage;
