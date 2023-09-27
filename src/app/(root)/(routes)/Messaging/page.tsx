import getUsers from "@/lib/db_actions/getUsers";
import prisma_db from "../../../prisma/db";
import UserList from "@/Components/Messaging/UserList";



export default async function usersLayout({ children } :{ children : React.ReactNode })
{
  const users = await getUsers();


    return (
        <div className = 'h-full'>
          <UserList items = {users} />
          {children}
        </div>
    )
}
  