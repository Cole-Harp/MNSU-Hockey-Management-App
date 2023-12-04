import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';


interface EventMenuProps {
  onClose: () => void;
  onEdit: () => void;
  event: any;
  isNewEvent?: boolean;
  admin?: boolean;
};


const formatEventDate = (date: string, allDay: boolean) => {
  const day = new Date(date)
  if (allDay) {
    return day.toDateString()
  } 
  return day.toLocaleString([], { dateStyle: "short", timeStyle: "short" })
};

export default function EventMenu({ onClose, onEdit, event, admin }: EventMenuProps) {
  const [eventDetails] = useState({
    title: event && event.title ? event.title : "",
    when: formatEventDate(event.start, event.allDay),
    where: event.where || "",
    desc: event.description || "",
    backgroundColor: event.backgroundColor || "",
    daysOfWeek: event.daysOfWeek || "[]",
    announcement: event.announcement || "[]",
    ...event,
  });
  console.log(eventDetails.daysOfWeek);

  const isMobile = /iPad|iPhone|iPod|Android/.test(navigator.userAgent);
  const daysOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function mapDaysOfWeek(daysOfWeek: string): string {
    // Parse the string into an array
    const daysOfWeekArray = JSON.parse(daysOfWeek);
  
    if (!Array.isArray(daysOfWeekArray) || daysOfWeekArray.length === 0) {
      return "[]";
    }
  
    return daysOfWeekArray.map(day => daysOfWeekNames[parseInt(day)]).join(', ');
  }

  return (
  <div className="w-full flex justify-center">
    <div className=" min-w-min max-w-6xl  bg-gray-100 border-8 rounded">
        <div className="relative">
          <button
            className="absolute top-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-1 right-1"
            onClick={onClose}
          >
            <div className="flex items-center justify-center">x</div>
          </button>
        </div>
        <div className="m-2 text-2xl font-bold">
          <div className="flex items-center">
            <span>{eventDetails.title}</span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-full grid grid-cols-3 gap-4">
          {eventDetails.when && (
            <>
              <div className="text-sm font-medium text-gray-500">When</div>
              <div className="col-span-2">
                <span>{eventDetails.when}</span>
              </div>
            </>
          )}
          {eventDetails.where && (
            <>
              <div className="text-sm font-medium text-gray-500">Where</div>
              <div className="col-span-2">
                <div className="flex z-50">
                  <Link href={mapUrl(eventDetails.where, isMobile)} target="_blank">
                    <span className="flex">
                      <Icon className='mr-2' icon="uil:map" width="22" height="22" />
                      {eventDetails.where}
                    </span>
                  </Link>
                </div>
              </div>
            </>
          )}
          {eventDetails.desc && (
            <>
              <div className="text-sm font-medium text-gray-500">Desc</div>
              <div className="col-span-2">
                <span>{eventDetails.desc}</span>
              </div>
            </>
          )}
          {eventDetails.daysOfWeek.length > 0 && (
            <>
              <div className="text-sm font-medium text-gray-500">Days of Week</div>
              <div className="col-span-2">
            {mapDaysOfWeek(eventDetails.daysOfWeek)}
          </div>
            </>
          )}
          <div className="flex justify-left">
            {((eventDetails.announcement === true && admin) || (!eventDetails.announcement)) && (
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-2 rounded"
                onClick={onEdit}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

}


const mapUrl = (where: string, isMobile?: boolean) => {
  if (isMobile) {
    return `maps://maps.apple.com/?q=${where}`;
  } else {
    return `https://www.google.com/maps/search/?api=1&query=${where}`;
  }
}