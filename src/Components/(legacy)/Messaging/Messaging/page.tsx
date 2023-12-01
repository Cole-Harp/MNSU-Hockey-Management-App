// 'use server'

// import ConversationList from "@/Components/(legacy)/Messaging/ConversationList";
// import { getAllConversations } from "@/Components/(legacy)/Messaging/Messages(legacy)/getAllConversations";

// import { useRouter } from 'next/navigation';
// //import React, { useRef, useEffect, useState } from 'react';

// // This page should display a list of conversations for the user to select from
// // TODO: Make a button to create a conversation


// export default async function usersLayout(){
 
//   const convos = await getAllConversations();
  

//     return (
//         <div className = 'h-full flex flex-row'>
//           <ConversationList />
//         </div>
//     )
// }
  
// // export default async function usersLayout({ children } :{ children : React.ReactNode })
// // {
// //   const [currConvo, setCurrConvo] = useState();
 
// //   const convos = await getAllConversations();
// //   if (userId === null) {
// //     throw new Error("Something went wrong authenticating");
// //   }
// // const data = await getConversationWithMessages(params.conversationId);


// //     return (
// //         <div className = 'h-full flex flex-row'>
// //           <ConversationList convos = {convos} />
// //           <div className='h-full flex flex-col'>
// //       <Header conversation={data} users={data.users} />
// //       <div className=" overflow-y-scroll max-[100vh - 200px] flex-grow" >
// //         <MessageList items={data.messages} convoId={params.conversationId} userId={userId} />
// //       </div>
// //       <MessageInput/>
// //     </div>
// //         </div>
        
// //     )
// // }
  