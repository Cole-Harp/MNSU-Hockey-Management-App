'use server'

import UserList from "@/Components/Messaging/UserList";
import { getAllConversations } from "@/lib/Messages/getAllConversations";


// This page should display a list of conversations for the user to select from
// TODO: Make a button to create a conversation
// TODO: Order Conversations by time last message was sent

export default async function usersLayout({ children } :{ children : React.ReactNode })
{
 
  const convos = await getAllConversations();
 

    return (
        <div className = 'h-full flex flex-row'>
          <UserList convos = {convos} />
        </div>
    )
}
  