import { Conversation, Message, User } from '@prisma/client'

export type FullConversation = Conversation & {
    users: User[],
    messages: Message[]
}

export type FullUser = User & {
    conversation: Conversation[]
}