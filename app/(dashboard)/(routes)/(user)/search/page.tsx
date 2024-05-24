import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { UserList } from "@/app/(dashboard)/_components/user/user-list";
import { SearchInput } from "@/components/search-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GymList } from "./_components/gym-list";

interface SearchPageProps {
  searchParams: {
    name: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const users = await db.user.findMany({
    where: {
      username: {
        contains: searchParams.name,
      },
    },
    include: {
      subscribers: true,
    },
  });

  const gyms = await db.gym.findMany({
    where: {
      name: {
        contains: searchParams.name,
      },
    },
    include: {
      subscribers: true,
    },
  });

  return (
    <div>
      <div className="px-6 flex justify-center md:justify-start mb-6">
        <SearchInput />
      </div>
      <Tabs
        defaultValue="users"
        className="flex flex-col items-center justify-center"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="gyms">Gyms</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserList data={users} />
        </TabsContent>
        <TabsContent value="gyms">
          <GymList data={gyms} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchPage;
