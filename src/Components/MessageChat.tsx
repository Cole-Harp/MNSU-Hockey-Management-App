"use client";

import React, { useEffect, useState } from 'react';
import { createConvo, createMessage, userConvos, getConversationWithMessages } from '../lib/db_actions/Message';
import Select from 'react-select';
import { Conversation, Message, User } from '@prisma/client';
import { getAllUsers } from '@/lib/db_actions/Auth';

export default function Conversations() {

    const [convoId, setConvoId] = useState<string>("");
    const [showCreateConvo, setShowCreateConvo] = useState<boolean>(false);

    const onSendMessage = async (message: any) => {
        await createMessage(message, convoId);
        // handle the new message somehow
    };

    const onCreateConvo = async (convoName: any, selectedUsers: []) => {
        const newConvo1 = await createConvo(convoName, selectedUsers);
        setConvoId(newConvo1.id); // Set the selected convo
    };

    const handleCreateConvoClick = () => {
        setShowCreateConvo(!showCreateConvo);
    };

    return (
        <div className='h-full flex flex-row'>
            <div>
                <ConvoBar onConvoClick={setConvoId} />
                {showCreateConvo && <CreateConvo onCreateConvo={onCreateConvo} />}
                <button onClick={handleCreateConvoClick} className="w-12 h-12 rounded-full bg-blue-500 text-white font-bold text-2xl">+</button>
            </div>
            <div className='flex-column w-full'>
                {convoId && <MessageBoard convoId={convoId} />}
                <SendMessage convoId={convoId} onSendMessage={onSendMessage} />
            </div>
        </div>
    );
}

function ConvoBar({ onConvoClick }: any) {
    const [convos, setConvos] = useState<Conversation[]>([]);

    useEffect(() => {
        const fetchConvos = async () => {
            const convos = await userConvos();
            setConvos(convos);
        };
        fetchConvos();
    }, []);
    return (
        <div className='p-4'>
            {convos && convos.map((convo) => (
                <div key={convo.id} onClick={() => onConvoClick(convo.id)} className='cursor-pointer py-2'>
                    {convo.name}
                </div>
            ))}
        </div>
    );
}


function MessageBoard({ convoId }: any) {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const convo_messages = await getConversationWithMessages(convoId);
            setMessages(convo_messages || []);
        };
        fetchMessages();

        const interval = setInterval(() => {
            fetchMessages();
        }, 5000);

        return () => clearInterval(interval);
    }, [convoId]);

    return (
        <div className='bg-white p-4 rounded'>
            {messages.map((message) => (
                <div key={message.id} className='border-b border-gray-200 py-2'>
                    <div className='text-gray-800'>{message.body}</div>
                    <div className='flex text-sm text-gray-500'>{message.userName.toString()}</div>
                    <div className='flex text-sm text-gray-500'>{message.createdAt.toString()}</div>
                </div>
            ))}
        </div>
    );
}


function SendMessage({ onSendMessage, convoId }: any) {
    const [message, setMessage] = useState('');

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        onSendMessage(message);
        setMessage('');
    };

    return (
        <div>
            {convoId && (
                <form onSubmit={handleSubmit} className=''>
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='rounded p-2 mr-2 z-50 text-black'
                    />
                    <button className='bg-blue-500 rounded px-4 py-2'>Send</button>
                </form>
            )}
        </div>
    );
}


function CreateConvo({ onCreateConvo }: any) {
    const [users, setUsers] = useState<User[]>([]);
    const [convoName, setConvoName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    useEffect(() => {
        const fetchConvos = async () => {
            const users = await getAllUsers();
            setUsers(users);
        };
        fetchConvos();
    }, []);

    const handleSubmit = () => {
        console.log("here")
        onCreateConvo(convoName, selectedUsers);
        setConvoName('');
        setSelectedUsers([]);
    };

    const options = users.map(user => ({ value: user.id, label: user.name }));

    return (
        <form onSubmit={handleSubmit} className=''>
            <input value={convoName} onChange={(e) => setConvoName(e.target.value)} className='rounded p-2 mb-2 text-black' />
            <Select
                isMulti
                name="users"
                options={options}

                classNamePrefix="select"
                onChange={(selectedOptions) => {
                    setSelectedUsers(selectedOptions.map(option => option.value));
                }}
            />
            <button type="submit" className='bg-green-500 rounded px-4 py-2'>Create Convo</button>
        </form>
    );
}

