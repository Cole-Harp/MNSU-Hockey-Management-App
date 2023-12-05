
import { getUser } from "@/lib/db_actions/Auth";
import Chats from "../../../../Components/Chats";



export default async function usersLayout({ children } :{ children : React.ReactNode })
{
   const user  = await getUser();
   if(user === null)
   {
    throw new Error('did not work') 
   }

    return (
        <div>
          <Chats  user = {user}/>
          {/* <GetChats user = {user/> */}
        </div>
        

    )
}
  

  