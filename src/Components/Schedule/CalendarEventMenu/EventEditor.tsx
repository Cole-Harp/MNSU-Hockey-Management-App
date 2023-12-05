import React, { useEffect, useState } from 'react';
import { EventInput, Calendar } from '@fullcalendar/core';
import { UserRole } from '@prisma/client';
import ColorSelect from './ColorPicker';
import AdminRoleSelector from '@/Components/Admin/AdminRoleSelector';
import DayPicker from './DayPicker';
import { Icon } from '@iconify/react';
// Assuming UserRole is defined in another file
interface EventMenuProps {
  event?: any;
  clickInfo: any;
  isNewEvent: boolean;
  isAdmin: boolean;
  currUserRole: string;
  removeEvent: () => void;
  addEvent: (event: any) => void;
  onClose: () => void;
  updateEvent: (id: string, event: any) => void;
  createEvent: (event: any) => void;
}

// function to parse date and time
function parseDateTime(date: string | number | Date, time: { split: (arg0: string) => { (): any; new(): any; map: { (arg0: NumberConstructor): [any, any]; new(): any; }; }; }) {
  const dateTime = new Date(date);
  if (time) {
    const [hours, minutes] = time.split(':').map(Number);
    dateTime.setHours(hours, minutes, 0, 0);
  }
  return dateTime;
}

// function to format date to YYYY-MM-DD
function formatDateToISO(date: { toISOString: () => string; }) {
  return date.toISOString().substring(0, 10);
}

// function to format time to HH:MM
function formatTime(date: { toTimeString: () => string; }) {
  return date.toTimeString().substring(0, 5);
}

const EventEditor: React.FC<EventMenuProps> = ({ event, isNewEvent, isAdmin, currUserRole, clickInfo, onClose, addEvent, removeEvent, updateEvent, createEvent }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [where, setWhere] = useState(event?.where || '');
  const [bgColor, setBgColor] = useState(event?.backgroundColor || '');
  const [description, setDescription] = useState(event?.description || '');
  const [allDay, setAllDay] = useState(event?.allDay || false);
  const [isRecurring, setIsRecurring] = useState(event?.daysOfWeek ? true : false)
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>(event?.daysOfWeek ? JSON.parse(event?.daysOfWeek) : []);
  const [startDateTime, setStartDateTime] = useState<Date>(new Date(event?.start || clickInfo?.start || Date.now()));
  const [endDateTime, setEndDateTime] = useState<Date>(new Date(event?.end || clickInfo?.end || Date.now()));
  const [startRecurDate, setStartRecurDate] = useState<Date>(new Date(event?.startRecur || Date.now()));
  const [endRecurDate, setEndRecurDate] = useState<Date>(new Date(event?.endRecur || Date.now()));

  //Admin States
  const [announcement, setAnnoncment] = useState<boolean>(event?.announcement || false)
  const [role, setRole] = useState<UserRole | string | any>(event?.role || currUserRole);


  // Update handlers
  const handleDateChange = (e: any, dateSetter: any) => {
    dateSetter(new Date(e.target.value));
  };

  const handleTimePersist = (e: any, dateSetter: any) => {
    // TODO: Time Needs to be localized for date editing from event editor
    const enteredDate = new Date(e.target.value);
    enteredDate.setDate(enteredDate.getDate());
    dateSetter(enteredDate);
  };

  const handleTimeChange = (e: any, dateTimeSetter: any, currentDateTime: any) => {
    dateTimeSetter(parseDateTime(currentDateTime, e.target.value));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currEvent: EventInput = {
      title: title,
      allDay: allDay,
      backgroundColor: bgColor,
      where: where,
      description: description,
      role: role
    };

    if (isRecurring) {
      // TODO: remove start and end time
      currEvent.daysOfWeek = JSON.stringify(daysOfWeek);
      currEvent.startRecur = startRecurDate.toISOString();
      currEvent.endRecur = endRecurDate.toISOString();
      currEvent.startTime = allDay ? undefined : formatTime(startDateTime);
      currEvent.endTime = allDay ? undefined : formatTime(endDateTime);
      currEvent.start = startDateTime.toISOString();
      currEvent.end = endDateTime.toISOString();
      currEvent.editable = false;
    } else {
      currEvent.daysOfWeek = undefined;
      currEvent.startRecur = undefined;
      currEvent.endRecur = undefined;
      currEvent.startTime = undefined;
      currEvent.endTime = undefined;
      currEvent.start = allDay ? startDateTime.toISOString() : startDateTime.toISOString();
      currEvent.end = allDay ? startDateTime.toISOString() : endDateTime.toISOString();
      currEvent.editable = true;

    }

    if (announcement) {
      currEvent.announcement = true;
      currEvent.role = role;
      currEvent.editable = false;
    }

    if (isNewEvent) {
      handleCreate(currEvent);
      onClose();
    } else {
      handleSave(currEvent);
      onClose();
    }
  };

  const handleCreate = async (newEvent: any) => {
    addEvent(await createEvent(newEvent));
  };

  const handleSave = async (updatedEvent: any) => {
    addEvent(await updateEvent(event.id, updatedEvent));
  };

  const handleDeleteClick = () => {
    removeEvent();
    onClose();
  };

  const handleClose = (e: React.FormEvent) => {
    onClose();
  };


  return (
    <>
      <div className="flex max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2 overflow-auto relative">
        <div className="flex-1 pr-4 mb-4">
          {/* Admin Utils and time Column */}
          <div className="">
            {isAdmin && (
              <>
                <div className="flex items-center mb-4">
                  <input className="mr-2 leading-tight" type="checkbox" checked={announcement} onChange={(e) => setAnnoncment(e.target.checked)} />
                  <span className="text-sm">Announcement</span>
                </div>
                {announcement && <AdminRoleSelector role={role} onSelect={(role) => setRole(role)} />}
              </>
            )}
            <>
              <div className="mb-4">
                <input
                  className="mr-2 leading-tight"
                  title='All Day'
                  aria-label='All Day'
                  type="checkbox"
                  checked={allDay}
                  onChange={(e) => setAllDay(e.target.checked)} />
                <span className="text-sm"> All Day </span>
              </div>
              <div className="mb-4">
                <input
                  className="mr-2 leading-tight"
                  title='Recurring'
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)} />
                <span className="text-sm"> Recurring </span>
              </div>
              {!isRecurring && (
                <div className="overflow-hidden transition-all duration-500 mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="date"
                    type="date"
                    value={formatDateToISO(startDateTime)}
                    onChange={(e) => handleTimePersist(e, setStartDateTime)}
                    placeholder="Date" />
                </div>
              )}
              <div>
                {!allDay && (
                  <><div className="overflow-hidden transition-all duration-500 mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start">Start Time</label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="start"
                      type="time"
                      value={formatTime(startDateTime)}
                      onChange={(e) => handleTimeChange(e, setStartDateTime, startDateTime)}
                      placeholder="Start Date and Time" />
                  </div><div className="transition-all duration-500 mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end">End Time</label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="end"
                        type="time"
                        value={formatTime(endDateTime)}
                        onChange={(e) => handleTimeChange(e, setEndDateTime, endDateTime)}
                        placeholder="End Date and Time" />
                    </div></>
                )}
              </div>
              {isRecurring && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="daysOfWeek">Days of Week</label>
                    <DayPicker selectedDays={daysOfWeek} onChange={(selectedDays) => setDaysOfWeek(selectedDays)} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startRecur">Start Recurrence Date</label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="startRecur"
                      type="date"
                      value={formatDateToISO(startRecurDate)}
                      onChange={(e) => handleDateChange(e, setStartRecurDate)}
                      placeholder="Start Recurrence Date" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endRecur">End Recurrence Date</label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="endRecur"
                      type="date"
                      value={formatDateToISO(endRecurDate)}
                      onChange={(e) => handleDateChange(e, setEndRecurDate)}
                      placeholder="End Recurrence Date" />
                  </div>
                </>
              )}
            </>
          </div>
          <div className="absolute bottom-0 left-0 p-4">
            <button
              className="hover:bg-red-700 text-black font-bold py-2 px-2 rounded mx-1"
              onClick={handleDeleteClick}
            >
              <Icon icon="uil:trash" width="28" height="28" />
            </button>
          </div>
        </div>

        <div className="flex-1 pl-4 mb-6">
          <div>
            {/* Event Details Column */}
            <button type='button' className="absolute top-1 right-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded" onClick={handleClose}>
              <div className="flex items-center justify-center">x</div>
            </button>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="where">Where</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="where" type="text" value={where} onChange={e => setWhere(e.target.value)} placeholder="Where" />
            </div>
            <div className="mb-4">
              <ColorSelect admin={isAdmin} announcement={announcement} color={bgColor} setColor={setBgColor} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
              <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"></textarea>
            </div>

          </div>
          <div className="absolute bottom-0 right-0 p-4 pr-4">
            <button
              className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

      </div>
    </>
  );
};


export default EventEditor;
