import { db } from "@/lib/db";
import { UserList } from "@/app/(dashboard)/_components/user/user-list"
import { SearchInput } from "@/components/search-input"


const SearchPage = async () => {
  const users = await db.user.findMany();

  return (
    <div>
      <div className="px-6 pt-6">
        <SearchInput />
      </div>
      <UserList data={users} />
    </div>
  )
}

export default SearchPage