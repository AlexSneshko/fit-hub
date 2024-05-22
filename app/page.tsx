import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const gym = await db.gym.findUnique({
    where: {
      id: userId,
    },
  });

  if (gym) {
    redirect(`/gym/${gym.username}`);
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user) {
    redirect(`/${user.username}`);
  }

  redirect("/select-type");
};

export default HomePage;
