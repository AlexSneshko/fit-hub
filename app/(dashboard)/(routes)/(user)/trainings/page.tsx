import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const TrainingsPage = () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  return <div>TrainingsPage</div>;
};

export default TrainingsPage;
