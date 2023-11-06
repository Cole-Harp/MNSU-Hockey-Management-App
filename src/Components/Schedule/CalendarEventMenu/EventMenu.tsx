import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import Select from 'react-select';
import Link from 'next/link';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface EventMenuProps {
  onDelete: () => void;
  onClose: () => void;
  onEdit: () => void;
  start: string;
  event: any;
  isNewEvent?: boolean;
  admin?: boolean;
};


const formatEventDate = (event: any, start: string) => {
  if (!event && !event?.start) {
    return new Date(start).toLocaleDateString();
  }
  if (event.allDay) {
    return event.start.toLocaleDateString();
  }
  return event.start.toLocaleString([], { dateStyle: "short", timeStyle: "short" });
};

export default function EventMenu({ onDelete, onClose, onEdit, event, start, isNewEvent = false, admin = false }: EventMenuProps) {
  const [eventDetails, setEventDetails] = useState({
    title: event && event.title ? event.title : "",
    when: formatEventDate(event, start),
    where: event && event.extendedProps.where ? event.extendedProps.where : "",
    desc: event && event.extendedProps.description ? event.extendedProps.description : "",
    backgroundColor: event && event.backgroundColor ? event.backgroundColor : "",
    daysOfWeek: event && event.daysOfWeek ? event.daysOfWeek as [] : [],
    // announcement: event.extendedProps.announcement ? event.extendedProps.announcement as boolean : true,
    ...event,
  });

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);


// Some type of useEffect

  const handleDeleteClick = () => {
    onDelete();
    onClose();
  };

  const handleClose = () => {
    onClose()
  }

  const handleEdit = () => {
    onEdit()
  }



  return (
    <div className="w-full">
      <div className="relative bg-gray-100 border-8 rounded">
        <div className="relative">
          <button
            className="absolute top-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-1 right-1"
            onClick={handleClose}
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
          <div className="text-sm font-medium text-gray-500">When</div>
          <div className="col-span-2">
           
              <span>{eventDetails.when}</span>
      
          </div>


            <><div className="text-sm font-medium text-gray-500">Where</div><div className="col-span-2">

                <div className="flex z-50">
                  <Link href={mapUrl(eventDetails.where, isIOS, isAndroid)} target="_blank">
                    <span className="flex">
                      <Icon className='mr-2' icon="uil:map" width="22" height="22" />
                      {eventDetails.where}
                    </span>
                  </Link>
                </div>
           

            </div></>
        

         
            <><div className="text-sm font-medium text-gray-500">Desc</div>
              <div className="col-span-2">

               
                  <span>{eventDetails.desc}</span>
               
              </div></>

          <div className="flex justify-left">
            
              <button
                className=" bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-2 rounded"
                onClick={handleEdit}
              >
                Edit
              </button>


            <button
               className="hover:bg-red-700 text-white font-bold py-2 px-2 rounded mx-1"
              onClick={handleDeleteClick}
            >
              <Icon icon="uil:trash" width="28" height="28" />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}


const mapUrl = (where: string, isIOS?: boolean, isAndroid?: boolean) => {

  if (isIOS) {
    return `maps://maps.apple.com/?q=${where}`;
  } else if (isAndroid) {
    return `https://www.google.com/maps/search/?api=1&query=${where}`;
  } else {
    return `https://www.google.com/maps/search/?api=1&query=${where}`;
  }
}