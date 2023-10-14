'use server'


import MessageList from "@/Components/Messaging/MessageList";
import MessageInput from "@/Components/Messaging/MessageInput";
import { getConversationById } from "@/lib/Messages/getConversationById";
import { getMessagesByConvId } from "@/lib/Messages/getMessagesByConvId";
import EmptyState from "@/Components/Messaging/EmptyState";
import Header from "@/Components/Messaging/Header";


// This page should display the conversation that was clicked on by the user from the messaging dashboard
// IParams takes the conversationId from the URL for use in the query

interface IParams { 
  conversationId: string
}

const ConversationId = async ({ params }: { params: IParams }) => {


  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessagesByConvId(params.conversationId);
  

  if(!conversation) {
    return (
      <div className = 'lg:pl-80 h-full'>
        <div className = 'h-full flex flex-col'> 
          <EmptyState/>
        </div>
      </div>
    )
  }

  return (
    <div>
    <div className = 'lg:pl-80 h-full'>
        <div className = 'h-full flex flex-col'> 
          <Header conversation = {conversation} />
          <MessageList items = {messages}></MessageList>
          <MessageInput></MessageInput>
        </div>
      </div>
      </div>
  )
}

export default ConversationId

