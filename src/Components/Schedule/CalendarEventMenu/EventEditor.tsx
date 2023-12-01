import React, { useEffect, useState } from 'react';
import { EventInput, Calendar } from '@fullcalendar/core';
import { $Enums, User, UserRole } from '@prisma/client';
import { createEvent, deleteEvent, updateEvent } from '@/lib/db_actions/Event';
import ColorSelect from './ColorPicker';
import AdminRoleSelector from '@/Components/Admin/AdminRoleSelector';
import { useSocket } from '@/Components/(legacy)/Socket/socker-provider';
import DayPicker from './DayPicker';
import Select from 'react-select';
import { Icon } from '@iconify/react';
// Assuming UserRole is defined in another file
interface EventMenuProps {
  calendar: Calendar;
  event?: any;
  clickInfo: any;
  isNewEvent: boolean;
  isAdmin: boolean;
  currUserRole: string;
  removeEvent: () => void;
  addEvent: (event: any) => void;
  onClose: () => void;
}

function getISOString(date: string | number | Date, time?: Date): Date {
  const parsedDate = new Date(date);
  if (time) {
    const parsedTime = new Date(time);
    parsedDate.setHours(parsedTime.getHours());
    parsedDate.setMinutes(parsedTime.getMinutes());
    parsedDate.setSeconds(parsedTime.getSeconds());
  }
  return parsedDate;
}

const EventEditor: React.FC<EventMenuProps> = ({ calendar, event, isNewEvent, isAdmin, currUserRole, clickInfo, onClose, addEvent, removeEvent }) => {
 const [title, setTitle] = useState(event?.title || '');
  const [where, setWhere] = useState(event?.where || '');
  const [bgColor, setBgColor] = useState(event?.backgroundColor || '');
  const [date, setDate] = useState<Date>(new Date(event?.start || clickInfo?.start || Date.now()));
  const [description, setDescription] = useState(event?.description || '');
  const [start, setStart] = useState<Date>(new Date(event?.start  || event?.start || clickInfo?.start || Date.now()));
  const [end, setEnd] = useState<Date>(new Date (event?.end  || clickInfo?.end || Date.now()));
  const [allDay, setAllDay] = useState(event?.allDay || false);
  const [isRecurring, setIsRecurring] = useState(event?.daysOfWeek ? true : false)
  const [startTime, setStartTime] = useState<string>(event?.startTime || start.toTimeString().substring(0, 5) || '' );
  const [endTime, setEndTime] = useState<string>(event?.endTime || end.toTimeString().substring(0, 5) || '' );
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>(event?.daysOfWeek ? event!.daysOfWeek : []);
  const [startRecur, setStartRecur] = useState<any>(new Date(event?.startRecur  || Date.now()));
  const [endRecur, setEndRecur] = useState<any>(new Date(event?.endRecur || Date.now()));

  //Admin States
  const [announcement, setAnnoncment] = useState<boolean>(event?.announcement || false)
  const [role, setRole] = useState<UserRole | string | any>(event?.role || currUserRole);

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
      currEvent.daysOfWeek = JSON.stringify(daysOfWeek);
      currEvent.startRecur = startRecur && startRecur.toISOString();
      currEvent.endRecur = endRecur && endRecur.toISOString();
      currEvent.startTime = startTime;
      currEvent.endTime = endTime;
      currEvent.start = undefined;
      currEvent.end = undefined;
      currEvent.editable = false
    } 
    else 
    {
      currEvent.daysOfWeek = undefined;
      currEvent.startRecur = undefined;
      currEvent.endRecur = undefined;
      currEvent.startTime = undefined;
      currEvent.endTime = undefined;
      currEvent.start = allDay ? getISOString(date) : getISOString(date, start);
      currEvent.end = allDay ? getISOString(date) : getISOString(date, end);

      currEvent.editable = true
    }

    if (announcement) {
      currEvent.announcement = true
      currEvent.role = role
      currEvent.editable = false
      console.log(role, "HERE")


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
  }

  const handleSave = async (updatedEvent: any) => {
    addEvent(await updateEvent(event.id, updatedEvent));
  }

  const handleDeleteClick = () => {
    removeEvent();
    onClose();
  };

  const handleClose = (e: React.FormEvent) => {
    onClose()
  }

  return (
    <>
    <div className="flex max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-auto">

      <div className="flex-1 pr-4"> {/* Admin Utils and time Column */}
        <div className="mb-4">

          <div>
            {start.toString()}
            {isAdmin && (
              <>
                <div className="flex items-center mb-4">
                  <input className="mr-2 leading-tight" type="checkbox" checked={announcement} onChange={e => setAnnoncment(e.target.checked)} />
                  <span className="text-sm">Announcement</span>
                </div>
                {announcement && <AdminRoleSelector role={role} onSelect={(role) => (setRole(role))} />}
              </>
            )}
            <>
              <div className="mb-4">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  checked={allDay}
                  onChange={(e) => setAllDay(e.target.checked)} />
                <span className="text-sm"> All Day </span>
              </div>
              <div className="mb-4">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)} />
                <span className="text-sm"> Recurring </span>
              </div>
              {!isRecurring && (
                <div className="h-full overflow-hidden transition-all duration-500 mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="date"
                  >
                    Date
                  </label>
                  {date.toString()}
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="start"
                    type="date"
                    value={date.toISOString().substring(0, 10)}
                    onChange={(e) => setDate(new Date(e.target.value))}
                    placeholder="Date" />
                </div>
              )}
              {!allDay && (
                <>
                  <div className="h-auto overflow-hidden transition-all duration-500 mb-4">
                    {start.toString()}
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="start"
                    >
                      Start Time
                    </label>
                    {startTime.toString()} 
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="start"
                        type="time"
                        value={startTime}
                        onChange={(e) => { 
                          if (isRecurring) {
                            setStartTime(e.target.value);
                          } else {
                            const hours = parseInt(e.target.value.substring(0, 2));
                          const minutes = parseInt(e.target.value.substring(3, 5));
                          const newDate = new Date(start);
                          newDate.setHours(hours, minutes);
                          setStart(newDate);
                        }}}
                        placeholder="Start Date and Time"
                      />
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="end"
                      type="time"
                      value={endTime}
                      onChange={(e) => { 
                        if (isRecurring) {
                          setEndTime(e.target.value);
                        } else {
                          const hours = parseInt(e.target.value.substring(0, 2));
                        const minutes = parseInt(e.target.value.substring(3, 5));
                        const newDate = new Date(start);
                        newDate.setHours(hours, minutes);
                        setEnd(newDate);
                      }}}
                      placeholder="End Date and Time" />
                  </div>
                </>
              )}
              {isRecurring && (
                <>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="daysOfWeek"
                    >
                      Days of Week
                    </label>
                    <DayPicker
                      selectedDays={daysOfWeek}
                      onChange={(selectedDays) => setDaysOfWeek(selectedDays)} />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="startRecur"
                    >
                      Start Recurrence Date
                      
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="startRecur"
                      type="date"
                      value={startRecur ? startRecur.toISOString().substring(0, 10) : start}
                      onChange={(e) => setStartRecur(new Date(e.target.value))}
                      placeholder="Start Recurrence Date" />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="endRecur"
                    >
                      End Recurrence Date
                    </label>
                    {endRecur ? endRecur.toISOString() : ""}
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="endRecur"
                      type="date"
                      value={endRecur ? endRecur.toISOString().substring(0, 10) : ""}
                      onChange={(e) => setEndRecur(new Date(e.target.value))}
                      placeholder="End Recurrence Date" />
                  </div>
                </>
              )}
            </>
          </div>


        </div>
      </div>


      <div className="flex-1 pl-4"> {/* Date and Event Details Column */}
        <button type='button' className="absolute top-1 right-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded" onClick={(e) => handleClose(e)}>
          <div className="flex items-center justify-center">x</div>
        </button>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="where">
            Where
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="where" type="text" value={where} onChange={e => setWhere(e.target.value)} placeholder="Where" />
        </div>
        <div className="mb-4">
          <ColorSelect admin={isAdmin} announcement={announcement} color={bgColor} setColor={setBgColor} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"></textarea>
        </div>
        <div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>
            Submit
          </button>
          <button
              className="hover:bg-red-700 text-black font-bold py-2 px-2 rounded mx-1"
              onClick={handleDeleteClick}
            >
              <Icon icon="uil:trash" width="28" height="28" />
            </button>
        </div>

      </div>


    </div>
    </>

  );
};




export default EventEditor;
