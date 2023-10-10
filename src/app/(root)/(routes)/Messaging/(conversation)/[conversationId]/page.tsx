'use server'

import UserList from "@/Components/Messaging/UserList";
import { getAllMessages } from "@/lib/route";
import MessageList from "@/Components/Messaging/MessageList";
import MessageInput from "@/Components/Messaging/MessageInput";
import { getConversationById } from "@/lib/Messages/getConversationById";
import { getAllConversations } from "@/lib/Messages/getAllConversations";
import { getMessagesByConvId } from "@/lib/Messages/getMessagesByConvId";
import EmptyState from "@/Components/Messaging/EmptyState";
import Header from "@/Components/Messaging/Header";
import Body from "@/Components/Messaging/Body";
import Form from "@/Components/Messaging/Form";
import { list } from "postcss";
import { useLocation } from 'react-router-dom'
import { withRouter } from "next/router";


interface IParams { 
  conversationId: string
}

const ConversationId = async ({ params }: { params: IParams }) => {


  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessagesByConvId(params.conversationId);
  console.log('params: ' + params.conversationId)

 

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
          <Form />
        </div>
      </div>
      </div>
  )
}

export default ConversationId

