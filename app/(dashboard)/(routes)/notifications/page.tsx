import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const NotificationsPage = () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  return <div>NotificationsPage</div>;
};

export default NotificationsPage;
