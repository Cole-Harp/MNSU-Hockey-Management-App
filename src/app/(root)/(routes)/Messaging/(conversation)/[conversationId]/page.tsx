'use server'


import MessageList from "@/Components/Messaging/MessageList";
import MessageInput from "@/Components/Messaging/MessageInput";
import { getConversationById } from "@/lib/Messages/getConversationById";
import { getMessagesByConvId } from "@/lib/Messages/getMessagesByConvId";
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
      <div className = 'lg:h-full'>
        <div className = 'h-full flex flex-col'> 
        </div>
      </div>
    )
  }

  return (
    <div>
    <div className = 'h-full'>
        <div className = 'flex flex-col'> 
          <Header conversation = {conversation} />
          <MessageList items = {messages}></MessageList>
          <MessageInput></MessageInput>
        </div>
      </div>
      </div>
  )
}

export default ConversationId

