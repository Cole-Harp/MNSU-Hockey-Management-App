<<<<<<< HEAD
import Conversations from "@/Components/MessageChat";
import { getAllUsers, getUser } from "@/lib/db_actions/Auth";
import Chats from "../../../../Components/Chats";
=======
'use server'

import ConversationList from "@/Components/Messaging/ConversationList";
import { getAllConversations } from "@/lib/Messages/getAllConversations";
>>>>>>> master

import { useRouter } from 'next/navigation';
//import React, { useRef, useEffect, useState } from 'react';

<<<<<<< HEAD
import axios from 'axios';

export default async function usersLayout({ children } :{ children : React.ReactNode })
{
    const user  = await getUser();
  
    return (
        <div>
          <Chats user = {user}/>
=======
// This page should display a list of conversations for the user to select from
// TODO: Make a button to create a conversation


export default async function usersLayout({ children } :{ children : React.ReactNode })
{
 
  const convos = await getAllConversations();
  

    return (
        <div className = 'h-full flex flex-row'>
          <ConversationList convos = {convos} />
>>>>>>> master
        </div>
    )
}
  