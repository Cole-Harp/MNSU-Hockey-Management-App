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


  return (
  <div className = 'w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'> 
    <div className = 'w-12 h-12 rounded-full flex items-center justify-center bg-red-500'>
    DLC
    </div>
    <div className = 'min-w-0 flex-1'>
      <div className = 'focus:outline-none'>
        <div className = 'flex justify-between items-center mb-1'>
          <p className = 'text-sm font-medium text-gray-900'>
            {data.name}
          </p>
        </div>
      </div>
    </div>
  </div>)
}

export default UserBox