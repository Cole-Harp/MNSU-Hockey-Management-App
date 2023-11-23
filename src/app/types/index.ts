import { Conversation, Message, User } from '@prisma/client'
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";



export type FullConversation = Conversation & {
    users: User[],
    messages: Message[]
}

export type FullUser = User & {
    conversation: Conversation[]
}

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
      server: NetServer & {
        io: SocketIOServer;
      };
    };
  };