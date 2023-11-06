import React, { useState } from 'react';
import { EventInput, Calendar } from '@fullcalendar/core';
import { $Enums, User, UserRole } from '@prisma/client';
import { createEvent, deleteEvent, updateEvent } from '@/lib/db_actions/Event';
import ColorSelect from './ColorPicker';
import AdminRoleSelector from '@/Components/Admin/AdminRoleSelector';

// Assuming UserRole is defined in another file
interface EventMenuProps {
    calendar: Calendar;
    event?: any;
    clickInfo: any;
    isNewEvent: boolean;
    isAdmin: boolean;
    currUserRole: string;
    onClose: () => void;
    // createEvent: (event: any) => Promise<void>;
}

function getISOString(dateString: string | number | Date, timeString?: undefined) {
    // Parse the date and time strings into Date objects
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1)
    if (!timeString) {
        const isoString = date.toISOString();
        return isoString;
    }

    const time = new Date(`1970-01-01T${timeString}`);

    // Combine the date and time parts of the Date objects
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    date.setSeconds(time.getSeconds());

    // Get the ISO string
    const isoString = date.toISOString();
    console.log(isoString)
    return isoString;
}

const EventEditor: React.FC<EventMenuProps> = ({ calendar, event, isNewEvent, isAdmin, currUserRole, clickInfo, onClose }) => {
    const [title, setTitle] = useState(event?.title || '');
    const [where, setWhere] = useState(event?.extendedProps?.where || '');
    const [bgColor, setBgColor] = useState(event?.backgroundColor || '');
    const [date, setDate] = useState<any>(event?.start ? event?.start : (clickInfo?.start ?? undefined));
    const [description, setDescription] = useState(event?.extendedProps?.description || '');
    const [start, setStart] = useState<any | undefined>(event?.start || clickInfo.start);
    const [end, setEnd] = useState<any | undefined>(event?.end || clickInfo.end);
    const [allDay, setAllDay] = useState(event?.allDay || false);
    const [isRecurring, setIsRecurring] = useState(false)
    const [daysOfWeek, setDaysOfWeek] = useState<number[]>(Array.isArray(event?.daysOfWeek) ? event!.daysOfWeek : []);
    const [startRecur, setStartRecur] = useState<any | undefined>(event?.startRecur);
    const [endRecur, setEndRecur] = useState<any | undefined>(event?.endRecur);
    const [newEvent, setNewEvent] = useState<boolean>(isNewEvent)

    //Admin States
    const [announcement, setAnnoncment] = useState<boolean>(false)
    const [role, setRole] = useState<UserRole | string | undefined>(currUserRole);

    console.log(date, start, end)

    const handleClose = () => {
        onClose()
    }

    const handleSubmit = async (e: React.FormEvent) => {
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
            currEvent.start = undefined;
            currEvent.end = undefined;
            currEvent.startTime = start.toString();
            currEvent.endTime = end.toString();
            currEvent.editable = false
        } else {
            currEvent.daysOfWeek = undefined;
            currEvent.startRecur = undefined;
            currEvent.endRecur = undefined;
            currEvent.start = start
            currEvent.end = end
            if (isNewEvent) {
                currEvent.start = allDay ? getISOString(date) : getISOString(date, start);
                currEvent.end = allDay ? getISOString(date) : getISOString(date, start);
            }
            currEvent.editable = true
        }

        if (announcement) {
            currEvent.announcement = true
            currEvent.role = role
            currEvent.editable = false
            console.log(role, "HERE")
        }

        if (isNewEvent) {
            calendar.addEvent(currEvent);
            await createEvent(currEvent);
            setNewEvent(isNewEvent)
        } else {
            handleSave(currEvent);
        }
    };
    const handleSave = async (updatedEvent: any) => {
        if (event) {
            const eventId = event.id!;
            console.log(eventId, isNewEvent)
            const calEvent = calendar.getEventById(eventId)
            await updateEvent(calEvent!.id, updatedEvent);
            event.setProp('title', updatedEvent!.title);
            event.setProp('backgroundColor', updatedEvent!.backgroundColor);
            event.setExtendedProp('where', where);
            event.setExtendedProp('description', description);
  
        }
    }

    return (
        <form className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-auto" onSubmit={handleSubmit}>
            Admin Utils
            {isAdmin &&
                <>
                    <div className="mb-4">
                        <input className="mr-2 leading-tight" type="checkbox" checked={announcement} onChange={e => setAnnoncment(e.target.checked)} />
                        <span className="text-sm">
                            Announcement
                        </span>
                    </div>
                    {announcement &&
                        <AdminRoleSelector onSelect={(role) => (setRole(role))} />
                    }
                </>
            }
            <button
                className="absolute top-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-1 right-1"
                onClick={handleClose}
            >
                <div className="flex items-center justify-center">x</div>
            </button>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                </label>
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
{isNewEvent && (
  <>
    <div className="mb-4">
      <input
        className="mr-2 leading-tight"
        type="checkbox"
        checked={allDay}
        onChange={(e) => setAllDay(e.target.checked)}
      />
      <span className="text-sm"> All Day </span>
    </div>
    <div className="mb-4">
      <input
        className="mr-2 leading-tight"
        type="checkbox"
        checked={isRecurring}
        onChange={(e) => setIsRecurring(e.target.checked)}
      />
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
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="start"
          type="date"
          value={date ? date.date : ""}
          onChange={(e) => setDate(new Date(e.target.value))}
          placeholder="Date"
        />
      </div>
    )}
    {!allDay && (
      <>
        <div className="h-auto overflow-hidden transition-all duration-500 mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="start"
          >
            Start Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="start"
            type="time"
            value={start ? start.time : ""}
            onChange={(e) => setStart(e.target.value)}
            placeholder="Start Date and Time"
          />
        </div>
        <div className="h-auto overflow-hidden transition-all duration-500 mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="end"
          >
            End Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="end"
            type="time"
            value={end ? end.time : ""}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="End Date and Time"
          />
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
            Days of Week (0-6, comma separated)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="daysOfWeek"
            value={Array.isArray(daysOfWeek) ? daysOfWeek.join(",") : ""}
            onChange={(e) =>
              setDaysOfWeek(e.target.value.split(",").map(Number))
            }
            placeholder="Days of Week (0-6, comma separated)"
          />
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
            value={startRecur ? startRecur.toISOString().substring(0, 10) : ""}
            onChange={(e) => setStartRecur(new Date(e.target.value))}
            placeholder="Start Recurrence Date"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endRecur"
          >
            End Recurrence Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endRecur"
            type="date"
            value={endRecur ? endRecur.toISOString().substring(0, 10) : ""}
            onChange={(e) => setEndRecur(new Date(e.target.value))}
            placeholder="End Recurrence Date"
          />
        </div>
      </>
    )}
  </>
)}
<div className="flex items-center justify-between">
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
  >
    Submit
  </button>
</div>
</form>
    );
};

export default EventEditor;