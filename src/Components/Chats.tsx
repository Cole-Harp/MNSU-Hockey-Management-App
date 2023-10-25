"use client";


import { useRouter } from 'next/navigation';
import { ChatEngine } from 'react-chat-engine';
import { Conversation, Message, User } from '@prisma/client';
import { getAllUsers } from '@/lib/db_actions/Auth';
import { auth, getAuth } from "@clerk/nextjs/server";
import React, { useRef, useEffect, useState } from 'react';
import { createConvo, createMessage, userConvos, getConversationWithMessages } from '../lib/db_actions/Message';
import Select from 'react-select';
import { getUser } from '@/lib/db_actions/Auth';

import axios from 'axios';

//const allUser = getAllUsers();

//console.log(allUser, "here")

interface ChatProps{
    user: User
}

const Chats = ({user}: ChatProps) => {
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(true);
 
 
  const history = useRouter();
  //console.log(user);

  

//   async function getFile(url: string): Promise<File> {
//     const response = await fetch(url);
//     const data = await response.blob();
//     return new File([data], "test.jpg", { type: 'image/jpeg' });
//   }

//   useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      
      if (!user || !user.name ) {
        history.push("/");
        return;
      }
      console.log("here", user.email,user.id);
      axios.get(
        'https://api.chatengine.io/users/me/',
        {
          headers: {
            "project-id": '61d8e5a6-da3c-403e-890f-3bb98e49b617',
            "user-name": user.email,
            "user-secret": user.id,
          },
        }
      )
      
        // .then(() => setLoading(false))
        .catch(e => {
        //   const formdata = new FormData();
        //   formdata.append('email', user.email?? "unAuth");
        //   formdata.append('username', user.email?? "unAuth");
        //   formdata.append('secret', user.id);
          console.log("here2");
          axios.post(
            'https://api.chatengine.io/users/',
        
            {
              headers: { "private-key": "4218d505-f3b6-4fed-8b5d-ef557be1c009" },
              data: {
                "user-name": user.email,
              "user-secret": user.id
            }
            }
          )
            // .then(() => setLoading(false))
            .catch(e => console.log('e', e.response));
             console.log("here");
        
        });
    }
//   }, [user, history]);

  //if (!user || loading) return <div />;

  //console.log("here");
  return (
    <div className='chats-page'>
      <div className='nav-bar'>
      </div>

      <ChatEngine
        height='calc(100vh - 66px)'
        projectID='61d8e5a6-da3c-403e-890f-3bb98e49b617'
        userName={user.email}
        userSecret={user.id}
        
      />
    </div>
  );
};

export default Chats;


// const Chats: React.FC = () => {

//     //const user = useUser();

//     return (
//         <div className='chats-page'>
//             <div className='nav-bar'>
//             </div>

//             <ChatEngine
//                 height='calc(100vh - 66px)'
//                 projectId='61d8e5a6-da3c-403e-890f-3bb98e49b617'
//                 userName='.'
//                 userSecret='.'
//             />
//         </div>
//     );
// }

// export default Chats;
