"use client";
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/core';
import { createEvent, deleteEvent, updateEvent, userGetEvents } from '@/lib/db_actions/Event';
import { UserRole } from '@prisma/client';
import  EventMenu  from './EventMenu';
import { title } from 'process';
import { useRouter } from 'next/navigation';

type CalendarProps = {
  options: any
};


const CalendarComponent: React.FC<CalendarProps> = ({ options }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [clickInfo, setClickInfo] = useState<any>(null);
  const [newEvent, setNewEvent] = useState<boolean>(false);

  function toEventList(events: any[]): EventInput[] {
    return events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description ?? '',
      start: event.start,
      end: event.end,
      allDay: event.allDay ?? true,
      role: event.role,
    }));
  }
  
  

  const handleDatesSet = async (dateInfo: { view: { calendar: any; }; startStr: any; endStr: any; }) => {

    const calendar = dateInfo.view.calendar;
    const start = dateInfo.startStr;
    const end = dateInfo.endStr;
    const events = toEventList(await userGetEvents(start, end));
    console.log("TEST",events)

  
    // TODO: Filter Options Here

    events.forEach((event) => {
      const existingEvent = calendar.getEventById(event.id);
      if (!existingEvent) {
        calendar.addEvent(event);
      }
    });
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
      role: UserRole.Player
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
  }
  
  

  const handleDateClick = async (selectInfo: { view: { calendar: any; }; startStr: any; endStr: any; allDay: any; }) => {
    setClickInfo(selectInfo)
    setNewEvent(true)
    setIsEditing(true)
  };
  

  const handleEventClick = async (clickInfo: any) => {
    setClickInfo(clickInfo);
    setNewEvent(false)
    setIsEditing(true);
    
  };

  
  const handleDelete = async () => {
    if (clickInfo) {
      const eventId = clickInfo.event.id;
      await deleteEvent(eventId);
      clickInfo.event.remove();
    }
  };

  const handleCreate = async(newTitle: string) => {

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
      role: role
    };
  
    if (title) {
      const calEvent = await createEvent(newEvent);
      calendar.addEvent(calEvent);
    }
  }
  
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
    }
  };

  function renderEventContent(clickInfo: any) {
    return (
      <div className='m-0 p-1'>

          <b>{clickInfo.timeText}</b>
          
          <b>{clickInfo.event.title}</b>

      </div>
    );
  }

  

  function handleClose(): any {
    setIsEditing(false);
  }

  return (
    <div className='m-3'>
    <div>
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
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
      eventAdd={function(){}}
      eventChange={function(){}}
      eventRemove={function(){}}
      selectOverlap={true}
      
    />
  </div>
  <div style={{zIndex: 9999}}  className='fixed z-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
    {isEditing && 
      <EventMenu
          title={clickInfo?.event?.title ?? "New Event"}
          onDelete={handleDelete}
          onSave={handleSave}
          onClose={handleClose} 
          onCreate={handleCreate}
          start={clickInfo.startStr}
          end={clickInfo.startStr}
          allDay={clickInfo.allDay}
          isNewEvent={newEvent}
        
          
          />
    }
  </div>
  </div>
  );
};

export default CalendarComponent;