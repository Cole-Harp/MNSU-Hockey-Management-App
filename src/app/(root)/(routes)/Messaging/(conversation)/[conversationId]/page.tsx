'use server'


import MessageList from "@/Components/Messaging/MessageList";
import MessageInput from "@/Components/Messaging/MessageInput";
import { getConversationById } from "@/lib/Messages/getConversationById";
import { getMessagesByConvId } from "@/lib/Messages/getMessagesByConvId";

import Header from "@/Components/Messaging/Header";
import { getConversationWithMessages } from "@/lib/db_actions/Message";
import { auth } from "@clerk/nextjs";
import ConversationList from "@/Components/Messaging/ConversationList";
import { getAllConversations } from "@/lib/Messages/getAllConversations";


// This page should display the conversation that was clicked on by the user from the messaging dashboard
// IParams takes the conversationId from the URL for use in the query

interface IParams { 
  conversationId: string
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const { userId }: { userId: string | null } = auth();
  if (userId === null) {
      throw new Error("Something went wrong authenticating");
    }
  const data = await getConversationWithMessages(params.conversationId);
  

  if(!data) {
    return (
      <div className = 'lg:h-full'>
        <div className = 'h-full flex '> 
          Loading{/* <EmptyState/> */}
        </div>
      </div>
    )
  }

  return (
    <div className='h-full flex flex-col'>
      <Header conversation={data} users={data.users} />
      <div className=" overflow-y-scroll flex-grow" >
        <MessageList items={data.messages} convoId={params.conversationId} userId={userId} />
      </div>
      <MessageInput/>
    </div>
  )
}

export default ConversationId

