import { auth } from "@clerk/nextjs";

import { UserCard } from "./user-card";
import { isUserSubcribed } from "@/lib/utils";
import { UserWithSubsribers } from "@/types/user";

interface UserListProps {
  data: UserWithSubsribers[];
}

export const UserList = ({ data }: UserListProps) => {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  if (data.length === 0) {
    return (
      <div className="w-hull mt-10 flex items-center justify-center">
        <h1>No Users</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-6 items-center justify-center">
      {data.map((user) => {
        return <UserCard key={user.id} data={user} isUserSubscribed={isUserSubcribed(user, userId)}/>
      }
      )}
    </div>
  );
};
