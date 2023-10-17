import { useState, MouseEventHandler, SetStateAction, useEffect } from 'react';
import { Icon } from '@iconify/react';

import Link from 'next/link';

interface EventMenuProps {
  onDelete: () => void;
  onSave: (data: any) => void;
  onCreate: (event: any) => void;
  onClose: () => void;
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

export default function EventMenu({ onDelete, onSave, onClose, onCreate, event, start, isNewEvent = false, admin = false }: EventMenuProps) {
  const [eventDetails, setEventDetails] = useState({
    title: event && event.title ? event.title : "",
    when: formatEventDate(event, start),
    where: event && event.extendedProps.where ? event.extendedProps.where : "",
    desc: event && event.extendedProps.description ? event.extendedProps.description : "",
    backgroundColor: event && event.backgroundColor ? event.backgroundColor : "",
    // announcement: event.extendedProps.announcement ? event.extendedProps.announcement as boolean : true,
    ...event,
  });
  const [isEditing, setIsEditing] = useState<boolean>(isNewEvent ? true : false)
  const [selectedRole, setSelectedRole] = useState('All'); //TODO ANNOUNCMENT ROLE SELECTION
  const [newEvent, setNewEvent] = useState<boolean>(isNewEvent)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);



  const handleSave = () => {
    onSave(eventDetails), setIsEditing(false);
  }

  const handleCreate = () => {
    setNewEvent(false), onCreate(eventDetails), handleSave(); //Added handle save to avoid async error def a better way to this
  };                                                          // Some type of useEffect

  const handleDeleteClick = () => {
    onDelete();
    onClose();
  };

  const handleClose = () => {
    onClose()
  }

  const handleEditClick = () => {
    if (isEditing) {
      if (newEvent) {
        handleCreate();
      } else {
        handleSave();
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  //TODO ADD RECURRING EVENTS
  //TODO ADD Location

  return (
    <div className="w-full">
      <div className="relative bg-gray-100 border-8 rounded">
        <div className="relative ">
          <button
            className="absolute top-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-2 right-1"
            onClick={handleClose}
          >
            <div className="flex items-center justify-center">x</div>
          </button>

        </div>
        <div className="m-3 text-2xl font-bold">

          {isEditing || newEvent ? (
            <input
              type="text"
              value={eventDetails.title}
              onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
              className=" p-1 shadow appearance-none rounded w-4/6 py-1 px-3 text-gray-700 leading-tight h-8"
              autoFocus

            />
          ) : (
            <div className="flex items-center">
              <span>{eventDetails.title}</span>
            </div>
          )}

        </div>
        <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-full grid grid-cols-3 gap-4">
          <div className="text-sm font-medium text-gray-500">When</div>
          <div className="col-span-2">
            {isEditing || newEvent ? (
              //TODO ADD DATE PICKER
              <span>{eventDetails.when}</span>
              // <input
              //   type="text"
              //   value={eventDetails.when}
              //   onChange={(e) => setEventDetails({ ...eventDetails, when: e.target.value })}
              //   className="flex shadow appearance-none rounded w-full py-1 px-3 text-gray-700 leading-tight"
              // />
            ) : (
              <span>{eventDetails.when}</span>
            )}
          </div>

          {(eventDetails.where !== "" || isEditing || newEvent) && (
            <><div className="text-sm font-medium text-gray-500">Where</div><div className="col-span-2">
              {isEditing || newEvent ? (
                <input
                  type="text"
                  value={eventDetails.where}
                  onChange={(e) => setEventDetails({ ...eventDetails, where: e.target.value })}
                  className="flex shadow appearance-none rounded w-full py-1 px-3 text-gray-700 leading-tight" />
              ) : (
                <div className="flex z-50">
                  <Link href={mapUrl(eventDetails.where, isIOS, isAndroid)} target="_blank">
                    <span className="flex">
                      <Icon className='mr-2' icon="uil:map" width="22" height="22" />
                      {eventDetails.where}
                    </span>
                  </Link>
                </div>
              )}

            </div></>
          )}

          {(eventDetails.desc != "" || isEditing || newEvent) && (
            <><div className="text-sm font-medium text-gray-500">Desc</div>
            <div className="col-span-2">

              {isEditing || newEvent ? (
                <input
                  type="text"
                  value={eventDetails.desc}
                  onChange={(e) => setEventDetails({ ...eventDetails, desc: e.target.value })}
                  className="flex shadow appearance-none rounded w-full py-1 px-3 text-gray-700 leading-tight" />
              ) : (
                <span>{eventDetails.desc}</span>
              )}
            </div></>)}

          <div className="flex justify-left">
            {(!eventDetails.announcement && (isEditing || newEvent)) ? (

              <div>
                <button
                  className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-2 rounded"
                  onClick={handleEditClick}
                >
                  Save
                </button>
                <div>
                  <select
                    className="p-1 absolute bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-1 rounded ml-2 right-4 bottom-3"
                    onChange={(e) =>
                      setEventDetails((event: any) => ({
                        ...event,
                        backgroundColor: e.target.value,
                      }))
                    }
                    value={eventDetails.backgroundColor}
                  >
                    <optgroup className='' label="Colors">
                      <option value="Blue">Blue</option>
                      <option value="Gray">Gray</option>
                      <option value="Gold">Gold</option>
                      <option value="Red">Red</option>
                    </optgroup>

                    {admin && (
                      <optgroup label="Announcement Colors">
                        <option value="Purple">Purple</option>
                      </optgroup>
                    )}
                  </select>
                  {admin && (
                    <select className="absolute bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-1 rounded ml-2 mr-2 right-28 bottom-3">
                                          <optgroup className='' label="For:">
                      <option>Me</option>
                      <option>Coaches</option>
                      <option>Faculty</option>
                      <option>Player</option>
                      <option>All</option>
                      </optgroup>
                    </select>
                  )}</div>
              </div>


            ) : (
              <button
                className=" bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-2 rounded"
                onClick={handleEditClick}
              >
                Edit
              </button>

            )}
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