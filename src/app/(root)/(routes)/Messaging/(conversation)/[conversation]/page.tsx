
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


interface IParams { 
  conversationId: string
}

const ConversationId = async ({ params }: { params: IParams }) => {

  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessagesByConvId(params.conversationId);
  const convos2 = await getAllConversations();

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
      <UserList convos = {convos2}></UserList>
    <div className = 'lg:pl-80 h-full'>
        <div className = 'h-full flex flex-col'> 
          <Header conversation = {conversation} />
          <Body />
          <Form />
        </div>
      </div>
      </div>
  )
}

export default ConversationId

