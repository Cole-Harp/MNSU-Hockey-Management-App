import Conversations from "@/Components/MessageChat";
import { getAllUsers } from "@/lib/db_actions/Auth";


export default async function usersLayout({ children } :{ children : React.ReactNode })
{
    return (
        <div>
          <Conversations/>
        </div>
    )
}
  