"use client";
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/core';
import { createEvent, deleteEvent, updateEvent, userGetEvents } from '@/lib/db_actions/Event';
import { UserRole } from '@prisma/client';

type CalendarProps = {
  options: any
};


const CalendarComponent: React.FC<CalendarProps> = ({ options }) => {

  function toEventList(events: any[]): EventInput[] {
    return events.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description ?? '',
        start: event.start ?? new Date(),
        end: event.end ?? new Date(),
        allDay: event.allDay ?? false,
        role: event.role,
        bubbles: true,
        cancelBubble: false,
        cancelable: true,
        composed: true,
        currentTarget: null,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        returnValue: true,
        srcElement: null,
        target: null,
        timeStamp: 0,
        type: '',
    }));
  }

  const handleDatesSet = async (dateInfo: { view: { calendar: any; }; startStr: any; endStr: any; }) => {

    const calendar = dateInfo.view.calendar;
    const start = dateInfo.startStr;
    const end = dateInfo.endStr;
    const events = toEventList(await userGetEvents(start, end));

  
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
    info.event.setProp('title', updatedEvent.title);
    info.event.setStart(updatedEvent.start);
    info.event.setEnd(updatedEvent.end);
  };

  const handleEventDrop = async (info: any) => {
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
    info.event.setProp('title', updatedEvent.title);
    info.event.setStart(updatedEvent.start);
    info.event.setEnd(updatedEvent.end);
  };

  const handleDateClick = async (selectInfo: { view: { calendar: any; }; startStr: any; endStr: any; allDay: any; }) => {
    const title = prompt('Please enter a new title for your event');
    const desc = prompt('Please enter a description for your event');
    const start = new Date(selectInfo.startStr);
    var end = new Date(selectInfo.endStr);
    const role = UserRole.Player;
    var allDay = false;
  
    // Ask the user if they want to create an all-day event
    if (confirm('Do you want to create an all-day event?')) {
      allDay = true;
      end = start;
    }
  
    const calendar = selectInfo.view.calendar;
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
  };

  const handleEventClick = async (clickInfo: any) => {
    if (confirm(`Are you sure you want to deconste the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
      const eventId = clickInfo.event.id;
      await deleteEvent(eventId);
    }
  };


  function renderEventContent(eventInfo: { timeText: string | number | null | undefined; event: { title: string | number | null | undefined; }; }) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  return (
    <div className='m-3'>
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
      
    />
  </div>
  );
};

export default CalendarComponent;