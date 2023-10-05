"use client";
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/core';
import { adminGetEvents, createEvent, deleteEvent, updateEvent, userGetEvents } from '@/lib/db_actions/Event';
import { UserRole } from '@prisma/client';
import EventMenu from './EventMenu';
import { FilterComponent } from './AdminFilter';
import { clerkClient } from '@clerk/nextjs';
import { getAllUsers } from '@/lib/db_actions/Auth';

type CalendarProps = {
  options: any;
};

const CalendarComponent: React.FC<CalendarProps> = ({ options }) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [calendar, setCalendar] = useState<any>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [clickInfo, setClickInfo] = useState<any>(null);
  const [newEvent, setNewEvent] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>();
  const [users, setUsers] = useState<any>([]);
  const [selectedPerson, setSelectedPerson] = useState<any>();

  useEffect(() => {
    if (calendarRef.current && calendarRef.current.getApi) {
      const calendarApi = calendarRef.current.getApi()
      setCalendar(calendarApi)
      handleDatesSet();
    }
  }, [selectedRole, calendarRef]);

  function toEventList(events: any[]): EventInput[] {
    if (!events) {
      return [];
    }
    return events
      .filter((event) => !selectedRole || event.role === selectedRole)
      .map((event) => {
        const backgroundColor = event.role === UserRole.Admin ? 'red' : 'blue';
        return {
          id: event.id,
          title: event.title,
          description: event.description ?? '',
          start: event.start,
          end: event.end,
          allDay: event.allDay ?? true,
          role: event.role,
          backgroundColor: "purple",
          authorId: event.authorId,
        };
      });
  };

  const handleDatesSet = async () => {
    if (calendar) {
      const start = calendar.view.activeStart;
      const end = calendar.view.activeEnd;
      const events = toEventList(await adminGetEvents(start, end, selectedPerson, selectedRole));
      calendar.removeAllEvents();
      events.forEach((event) => {
        calendar.addEvent(event);
      });
    }
  };

  const handleEventResize = async (info: any) => {
    const eventId = info.event.id;
    const updatedEvent = {
      id: info.event.id,
      title: info.event.title,
      description: info.event.description,
      start: info.event.start,
      end: info.event.end,
      allDay: info.event.allDay,
      role: UserRole.Player,
    };
    await updateEvent(eventId, updatedEvent);
  };

  const handleEventDrop = async (info: any) => {
    const eventId = info.event.id;
    const updatedEvent = {
      id: info.event.id,
      title: info.event.title,
      description: info.event.description,
      start: info.event.start,
      end: info.end,
      allDay: info.event.allDay,
      role: UserRole.Player,
    };
    await updateEvent(eventId, updatedEvent);
  };

  const handleDateClick = async (selectInfo: { view: { calendar: any; }; startStr: any; endStr: any; allDay: any; }) => {
    setClickInfo(selectInfo);
    setNewEvent(true);
    setIsEditing(true);
  };

  const handleEventClick = async (clickInfo: any) => {
    setClickInfo(clickInfo);
    setNewEvent(false);
    setIsEditing(true);
  };

  const handleDelete = async () => {

    const eventId = clickInfo.event.id;
    await deleteEvent(eventId);
    clickInfo.event.remove();

  };

  const handleCreate = async (newTitle: string) => {
    const title = newTitle;
    const desc = "";
    const start = new Date(clickInfo.startStr).toISOString();
    const end = new Date(clickInfo.endStr).toISOString();
    const role = UserRole.Player;
    const allDay = clickInfo.allDay;
    const calendar = clickInfo.view.calendar;
    calendar.unselect();

    const newEvent = {
      title: title,
      description: desc,
      start: start,
      end: end,
      allDay: allDay,
      role: role,
    };

    if (title) {
      const calEvent = await createEvent(newEvent);
      calendar.addEvent(calEvent);
    }
  };

  const handleSave = async (newTitle: string) => {
    if (clickInfo && clickInfo.event) {
      const eventId = clickInfo.event.id;
      const updatedEvent = {
        id: eventId,
        title: newTitle,
        description: clickInfo.event.description,
        start: clickInfo.event.start,
        end: clickInfo.event.end,
        allDay: clickInfo.event.allDay,
        role: UserRole.Player,
      };
      await updateEvent(eventId, updatedEvent);
      clickInfo.event.setProp('title', newTitle);
      setIsEditing(false)
      setIsEditing(true)
    }
  };

  function renderEventContent(clickInfo: any) {
    return (
      <div className="">
        <div className="flex text-sm font-medium text">{clickInfo.timeText}</div>
        <div className="flex text-lg sm:text-sm font-bold truncate">{clickInfo.event.title}</div>

      </div>
    );
  }

  function handleClose(): any {
    setIsEditing(false);
  }

  const handleCustomButtonClick = async () => {
    setUsers(await getAllUsers())
    setShowFilter(!showFilter);
  };

  const handleFilter = async (role: any, selectedPerson: any) => {
    setSelectedRole(role);
    setSelectedPerson(selectedPerson);


  };

  return (
    <div className='m-3'>

      <div>
        {showFilter && <FilterComponent onFilter={handleFilter} users={users}/>}
        <FullCalendar           ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          customButtons={{
            myCustomButton: {
              text: 'Filter',
              click: handleCustomButtonClick,
            },
          }}
          headerToolbar={{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}


          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateClick}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventResize={handleEventResize}
          eventDrop={handleEventDrop}
          datesSet={handleDatesSet}
          selectOverlap={true}
          
        />
      </div>
      <div style={{ zIndex: 9999 }} className='fixed z-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {isEditing && <EventMenu
          onDelete={handleDelete}
          onSave={handleSave}
          onClose={handleClose}
          onCreate={handleCreate}
          event={clickInfo?.event}
          isNewEvent={newEvent}
          
        />}
      </div>
    </div>
  );
};

export default CalendarComponent;
