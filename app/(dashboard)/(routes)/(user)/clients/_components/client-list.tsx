import { UserCard } from "@/app/(dashboard)/_components/user/user-card"
import { TrainerWithClients } from "@/types/trainer"
import { User } from "@prisma/client"

interface ClientListProps {
  data: TrainerWithClients
}

export const ClientList = ({
  data
}: ClientListProps) => {
  return (
    <div className="flex flex-col gap-y-6 items-center justify-center">
      {data.clients.map((client) => (
        <UserCard key={client.clientId} data={client.client}/>
      ))}
    </div>
  )
}