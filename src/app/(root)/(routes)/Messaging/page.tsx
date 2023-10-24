'use server'

import ConversationList from "@/Components/Messaging/ConversationList";
import { getAllConversations } from "@/lib/Messages/getAllConversations";


// This page should display a list of conversations for the user to select from
// TODO: Make a button to create a conversation


export default async function usersLayout({ children } :{ children : React.ReactNode })
{
 
  const convos = await getAllConversations();
  

    return (
        <div className = 'h-full flex flex-row'>
          <ConversationList convos = {convos} />
        </div>
    )
}
  