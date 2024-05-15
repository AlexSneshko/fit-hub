import { User } from "@prisma/client"

import { UserCard } from "./user-card"

interface UserListProps {
    data: User[]
}

export const UserList = ({
    data
}: UserListProps) => {
    return (
        <div className="flex flex-col gap-y-6 items-center justify-center">
          {data.map((user) => (
            <UserCard key={user.id} data={user} />
          ))}
        </div>
      )
}
