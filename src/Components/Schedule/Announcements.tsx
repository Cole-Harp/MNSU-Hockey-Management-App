"use client";

import { useState } from 'react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      title: 'Practice Today',
      content: '7pm-9pm',
      date: 'September 1, 2023'
    },
    {
      title: 'Dinner Orders',
      content: 'Link to order dinners?',
      date: 'August 15, 2023'
    },
    {
      title: 'W',
      content: 'We win',
      date: 'July 1, 2023'
    }
  ]);

  return (
    <div>
      <h1 className='text-4xl text-gray-800 p-2'>Announcements</h1>
      {announcements.map((announcement, index) => (
        <div key={index} className='bg-white shadow-md rounded p-5 my-4 w-full'>
          <h3 className='text-xl font-bold mb-2'>{announcement.title}</h3>
          <p className='text-gray-700 mb-2'>{announcement.content}</p>
          <p className='text-gray-500'>{announcement.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Announcements;