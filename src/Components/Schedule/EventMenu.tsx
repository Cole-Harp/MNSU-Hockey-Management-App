"use client";

import { useState, MouseEventHandler } from 'react';
import { EventInput } from '@fullcalendar/core';
import { UserRole } from '@prisma/client';
import { deleteEvent, updateEvent } from '@/lib/db_actions/Event';

interface EventMenuProps  {
    title: string;
    onDelete: () => void;
    onSave: (newTitle: string) => void;
    onCreate: (event: any) => void;
    onClose: () => void;
    start?: string;
    end?: string;
    allDay?: boolean;
    isNewEvent?: boolean;
};

export default function EventMenu({ title, onDelete, onSave, onClose, onCreate, start, end, allDay, isNewEvent = false }: EventMenuProps) {
  const [newTitle, setNewTitle] = useState<string>(title);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSave = () => {
    isNewEvent ? (onCreate(newTitle), onClose()) : (onSave(newTitle), onClose());
  };

  const handleDelete = () => {
    onDelete();
    onClose()
  };

  const handleClose = () => {
    setIsOpen(false)
    onClose() 
  }

  return (
    <>
     
     
     
     
          <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        onClick={() => setIsOpen(true)}
      >
        <span>...</span>
      </button>
      {isOpen && (
        <div className="flex inset-0 overflow-y-auto bg-white">
          <div className=" flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-primary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h2 className='text-lg font-medium'>{isNewEvent ? 'Add Event' : 'Edit Event'}</h2>
                <div className="mt-3 sm:mt-4">
                  <label
                    htmlFor="title"
                    className="block text-white font-bold mb-2"
                  >
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSave}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                {!isNewEvent && <button
                  onClick={handleDelete}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>}
                <button
                  onClick={handleClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}