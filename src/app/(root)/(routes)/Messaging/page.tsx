


import { getAllUsers, getUser } from "@/lib/db_actions/Auth";
import Chats from "../../../../Components/Chats";

import { useRouter } from 'next/navigation';
//import React, { useRef, useEffect, useState } from 'react';

import axios from 'axios';

export default async function usersLayout({ children } :{ children : React.ReactNode })
{
   const user  = await getUser();
   if(user === null)
   {
    throw new Error('did not work') 
   }
    //const user = auth();



    return (
        <div>
          <Chats  user = {user}/>
          {/* <GetChats user = {user/> */}
        </div>

    )
}
  
// export default async function usersLayout({ children } :{ children : React.ReactNode })
// {
//   const [currConvo, setCurrConvo] = useState();
 
//   const convos = await getAllConversations();
//   if (userId === null) {
//     throw new Error("Something went wrong authenticating");
//   }
// const data = await getConversationWithMessages(params.conversationId);


//     return (
//         <div className = 'h-full flex flex-row'>
//           <ConversationList convos = {convos} />
//           <div className='h-full flex flex-col'>
//       <Header conversation={data} users={data.users} />
//       <div className=" overflow-y-scroll max-[100vh - 200px] flex-grow" >
//         <MessageList items={data.messages} convoId={params.conversationId} userId={userId} />
//       </div>
//       <MessageInput/>
//     </div>
//         </div>
        
//     )
// }
  