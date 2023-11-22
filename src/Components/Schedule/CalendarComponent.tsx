"use client";
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { User, UserRole } from '@prisma/client';
import EventMenu from './CalendarEventMenu/EventMenu';
import { createEvent, deleteEvent, updateEvent, userGetEvents } from '@/lib/db_actions/Event';
import EventMenu2 from './CalendarEventMenu/EventEditor';
import iCalendarPlugin from '@fullcalendar/icalendar'
import { tr } from 'date-fns/locale';
import EventEditor from './CalendarEventMenu/EventEditor';


type CalendarProps = {
  isAdmin: boolean;
  events: any[];
  currUser: User;
};

const CalendarComponent: React.FC<CalendarProps> = ({ isAdmin, currUser, events }) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [calendar, setCalendar] = useState<any>(null)
  const [clickInfo, setClickInfo] = useState<any>(null);
  const [eventState, setEventState] = useState({ 
    isEditing: false, 
    isNewEvent: false,
    isLooking: false });

  useEffect(() => {
    const handleResize = () => {
      if (calendarRef.current) {
        if (window.innerWidth >= 768) {
          calendarRef.current.getApi().changeView('timeGridWeek');
        } else {
          calendarRef.current.getApi().changeView('dayGridDay');
        }
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (calendarRef.current && calendarRef.current.getApi) {
      const calendarApi = calendarRef.current.getApi()
      setCalendar(calendarApi)
    }
  }, [calendarRef, calendarRef.current]);

    const handleDatesSet = async () => {
    if (calendar) {

  
      const currentEvents = calendar.getEvents();
  
      if (events) {
        events.forEach((event: { id: string; }) => {
          // Check if the event already exists in the calendar
          const existingEvent = currentEvents.find((e: { id: string; }) => e.id === event.id);
  
          // If the event doesn't exist, add it to the calendar
          if (!existingEvent) {
            let inputEvent = toEvent(event);
            calendar.addEvent(inputEvent);
          }
        });
      }
    }
  };
  
  function toEvent(event: any) {
    const daysOfWeek = event.daysOfWeek ? JSON.parse(event.daysOfWeek) as string[] : undefined;
    const currEvent: any = {
      id: event.id,
      title: event.title,
      allDay: event.allDay,
      backgroundColor: event.backgroundColor,
      extendedProps: {
        where: event.where,
        description: event.description,
        role: event.role,
        authorId: event.authorId,
        announcement: event.announcement
      }
    };
  
    if (daysOfWeek && daysOfWeek.length > 2) {
      // Recurring event
      currEvent.startRecur = event.startRecur;
      currEvent.endRecur = event.endRecur;
      currEvent.startTime = event.startTime;
      currEvent.endTime = event.endTime;
      currEvent.daysOfWeek = daysOfWeek;
      currEvent.editable = false
    } else {
      // Non-recurring event
      currEvent.start = event.start;
      currEvent.end = event.end;
    }
  
    return currEvent;
  }

  const handleDateClick = async (selectInfo: { view: { calendar: any; }; startStr: any; endStr: any; allDay: any; }) => {
    setClickInfo(selectInfo);
    setEventState({...eventState, isNewEvent: true, isEditing: true });

  };

  const handleEventClick = async (clickInfo: any) => {
    setClickInfo(clickInfo);
    setEventState({ isNewEvent: false, isEditing: false, isLooking: true });
  };


  const handleMove = async (changeInfo: { event: any; }) => {
    const event = changeInfo.event;
    const start = new Date(event.startStr);
    const end = new Date(event.endStr);
    const allDay = event.allDay;

    if (allDay) {
      // Add 1 day to the start and end if its all day date not sure why
      start.setDate(start.getDate() + 1);
      end.setDate(end.getDate() + 1)
    }

    const newEvent = {
      start: start.toISOString(),
      end: allDay ? start.toISOString() : end,
      allDay: allDay,
    };

    console.log(newEvent);
    await updateEvent(event.id, newEvent);
  };

  const handleDelete = async () => {

    const eventId = clickInfo.event.id;
    await deleteEvent(eventId);
    clickInfo.event.remove();

  };

  function handleClose(): any {
    setEventState({ ...eventState, isEditing: false, isLooking: false });
  }

  function handleEdit(): any {
    setEventState({ ...eventState, isEditing: true, isLooking: false });
  }

  function renderEventContent(clickInfo: any) {

    return (
      <>
        <div className="m-0 border-2 w-full h-full p-1">
          <div className="text-lg sm:text-sm font-bold truncate">{clickInfo.event.title}</div>
          <div className="text-sm font-medium text">{clickInfo.timeText}</div>
        </div>
      </>
    );
  }

  return (
    <div className='m-3 w-full'>
      
   <div>
   <div className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
   {eventState.isEditing && <EventEditor calendar={calendar} event={clickInfo?.event || undefined} clickInfo={clickInfo} currUserRole={currUser.role} isNewEvent={eventState.isNewEvent} isAdmin={isAdmin} onClose={handleClose} />}
   </div>
   <button onClick={() => setEventState({...eventState, isEditing: true })}>Create Event</button>
        <FullCalendar ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, iCalendarPlugin]}
          headerToolbar={{
            left: 'prev,next today dayGridWeek',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="dayGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateClick}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          datesSet={handleDatesSet}
          // events = {events}

          selectOverlap={true}
          eventChange={handleMove}
          firstDay={1}
          rerenderDelay={50}

        />
      </div>
      <div className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {(eventState.isLooking) && <EventMenu
          onDelete={handleDelete}
          onEdit={handleEdit}
          onClose={handleClose}

          start={clickInfo?.startStr || ""}
          event={clickInfo?.event || undefined}
          isNewEvent={eventState.isNewEvent}
          admin={false}

        />}
      </div>
    </div>
  );
};

export default CalendarComponent;
