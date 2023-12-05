'use server'


import MessageList from "@/Components/(legacy)/Messaging/MessageList";
import MessageInput from "@/Components/(legacy)/Messaging/MessageInput";
import { getConversationById } from "@/Components/(legacy)/Messaging/Messages(legacy)/getConversationById";
import { getMessagesByConvId } from "@/Components/(legacy)/Messaging/Messages(legacy)/getMessagesByConvId";

import Header from "@/Components/(legacy)/Messaging/Header";
import { getConversationWithMessages } from "@/lib/db_actions/Message";
import { auth } from "@clerk/nextjs";
import ConversationList from "@/Components/(legacy)/Messaging/ConversationList";
import { getAllConversations } from "@/Components/(legacy)/Messaging/Messages(legacy)/getAllConversations";


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
        <div className = 'h-full flex flex-col'> 

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

