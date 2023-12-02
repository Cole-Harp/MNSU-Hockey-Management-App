"use client";

import { ChatEngine } from 'react-chat-engine';
import { User } from '@prisma/client';

import React from 'react';

interface ChatProps{
    user: User
}

const Chats = ({user}: ChatProps) => {
   
  return (
    <div className='chats-page'>
      <div className='nav-bar'>
      </div>

      <ChatEngine
        height='calc(100vh - 66px)'
        projectID='61d8e5a6-da3c-403e-890f-3bb98e49b617'
        userName={user.name}
        userSecret={user.id}
        
      />
    </div>
  );
};

export default Chats;


