import Conversations from "@/Components/MessageChat";
import { getAllUsers, getUser } from "@/lib/db_actions/Auth";
import Chats from "../../../../Components/Chats";

import { useRouter } from 'next/navigation';
//import React, { useRef, useEffect, useState } from 'react';

import axios from 'axios';

export default async function usersLayout({ children } :{ children : React.ReactNode })
{
    const user  = await getUser();
  
    return (
        <div>
          <Chats user = {user}/>
        </div>
    )
}
  