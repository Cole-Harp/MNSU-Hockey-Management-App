'use client'

import { User } from '@prisma/client'
import { FC, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface UserBoxProps{
    data: User
}

interface UserBoxProps {}

const UserBox: React.FC<UserBoxProps> = ({data}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);
        axios.post('/api/conversations', { userId: data.id })
        .then((data) => { 
            router.push(`/conversations/${data.data.id}`);
        })
        .finally(() => setIsLoading(false));
    }, [data, router]);


  return (
  <div>
    UserBox
  </div>)
}

export default UserBox