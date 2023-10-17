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
import { getAllUsers, isAdmin } from '@/lib/db_actions/Auth';
import moment from 'moment';

type CalendarProps = {
  options: any;
};

const CalendarComponent: React.FC<CalendarProps> = ({ options }) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [calendar, setCalendar] = useState<any>(null)
  const [annoncments, setAnnoncments] = useState<boolean>(false)

  const [clickInfo, setClickInfo] = useState<any>(null);
  const [eventState, setEventState] = useState({ isEditing: false, isNewEvent: false });
  const [showFilter, setShowFilter] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>();
  const [selectedPerson, setSelectedPerson] = useState<any>("me");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (calendarRef.current && calendarRef.current.getApi) {
      const calendarApi = calendarRef.current.getApi()
      setCalendar(calendarApi)
      handleDatesSet();
    }
  }, [selectedRole, selectedPerson, calendarRef.current, admin]);

  const handleDatesSet = async () => {
    if (calendar) {
      const start = calendar.view.activeStart;
      const end = calendar.view.activeEnd;
      setAdmin(await isAdmin());


      // if (annoncments == true && calendar) {
      //   const events = await userGetEvents(start, end);
      //   const currentEvents = calendar.getEvents();
      //   calendar.removeAllEvents();

      //   events.forEach((event) => {
      //     // Check if the event already exists in the calendar
      //     const existingEvent = currentEvents.find((e: { id: string; backgroundColor: string; }) => e.backgroundColor === 'Purple');

      //     // If the event doesn't exist and has a background color of 'purple', add it to the calendar
      //     if (!existingEvent && event.backgroundColor === 'purple') {
      //       let inputEvent = toEvent(event);
      //       calendar.addEvent(inputEvent);
      //     }
      //   });

      //   setAdmin(await isAdmin());
      // }


      if (calendar && !admin) {
        const events = await userGetEvents(start, end);
        const currentEvents = calendar.getEvents();

        events.forEach((event) => {
          // Check if the event already exists in the calendar
          const existingEvent = currentEvents.find((e: { id: string; }) => e.id === event.id);

          // If the event doesn't exist, add it to the calendar
          if (!existingEvent) {
            let inputEvent = toEvent(event);
            calendar.addEvent(inputEvent);
          }
        });
      }



      if (admin) {
        const events = await adminGetEvents(start, end, selectedPerson, selectedRole);
        const currentEvents = calendar.getEvents();

        events.forEach((event) => {
          // Check if the event already exists in the calendar
          const existingEvent = currentEvents.find((e: { id: string; }) => e.id === event.id);

          // If the event doesn't exist, add it to the calendar
          if (!existingEvent) {
            let inputEvent = toEvent(event);
            calendar.addEvent(inputEvent);
          }
        });
        // Added filter to handle admin filter variable changes could probably be turned to conditional
        currentEvents.forEach((event: { id: string; remove: () => void; }) => {
          if (!events.find((e) => e.id === event.id)) {
            event.remove();
          }
        });
      }
    }
  };

  function toEvent(event: any) {

    console.log("TEST", event.description, event.id)

    return {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
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
  };

  const handleDateClick = async (selectInfo: { view: { calendar: any; }; startStr: any; endStr: any; allDay: any; }) => {
    setClickInfo(selectInfo);
    setEventState({ isNewEvent: true, isEditing: true });

  };

  const handleEventClick = async (clickInfo: any) => {
    setClickInfo(clickInfo);
    setEventState({ isNewEvent: false, isEditing: true });
  };


  const handleMove = async (changeInfo: any) => {
    const event = changeInfo.event;
    const start = new Date(event.startStr);
    const end = new Date(event.endStr);
    const role = UserRole.Player;
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

  const handleSave = async (data: { title: any; where: any; desc: any; backgroundColor: any }) => {
    if (clickInfo && clickInfo.event) {
      const eventId = clickInfo.event.id;
      const updatedEvent = {
        title: data.title,
        where: data.where,
        description: data.desc,
        start: clickInfo.start,
        end: clickInfo.end,
        allDay: clickInfo.allDay,
        role: clickInfo.role,
        backgroundColor: data.backgroundColor,
      };

      await updateEvent(eventId, updatedEvent);
      clickInfo.event.setProp('title', data.title,);
      clickInfo.event.setProp('backgroundColor', data.backgroundColor,);
      clickInfo.event.setExtendedProp('where', data.where)
      clickInfo.event.setExtendedProp('description', data.desc)
    }
  }

  const handleDelete = async () => {

    const eventId = clickInfo.event.id;
    await deleteEvent(eventId);
    clickInfo.event.remove();

  };

  const handleCreate = async (data: { title: any; where: any; desc: any; backgroundColor: any }) => {
    const title = data.title;
    const where = data.where
    const bgColor = data.backgroundColor
    const description = data.desc;
    const start = new Date(clickInfo.startStr);
    const end = new Date(clickInfo.endStr);
    const role = UserRole.Player;
    const allDay = clickInfo.allDay;
    const calendar = clickInfo.view.calendar;

    if (allDay) {
      start.setDate(start.getDate() + 1); // Add 1 day to the start date not sure why
    }

    const newEvent = {
      title: title,
      start: start,
      end: end,
      allDay: allDay,
      backgroundColor: bgColor,
      where: where,
      role: role,
      description: description,
    };

    if (title) {
      const calEvent = await createEvent(newEvent);
      calendar.addEvent(calEvent);
    }
  };


  function handleClose(): any {
    setEventState({ ...eventState, isEditing: false });
  }

  const handleFilterButtonClick = async () => {
    setShowFilter(!showFilter);
  };

  const handleAnnouncements = () => {
    setAnnoncments(!annoncments)
  };

  const handleFilter = (role: any, selectedPerson: any) => {
    setSelectedRole(role);
    setSelectedPerson(selectedPerson);
  };

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
        {showFilter && <FilterComponent
          onFilter={handleFilter} />}

        <FullCalendar ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          customButtons={{
            myCustomButton: admin ? {
              text: 'Filter',
              click: handleFilterButtonClick
            } : {},
          }}
          views={{
            dayGridWeek: {
              buttonText: 'Team Schedule only',
              click: handleAnnouncements,

              eventContent: renderEventContent,
              datesSet: handleDatesSet,
            },

          }}
          headerToolbar={{
            left: 'prev,next today dayGridWeek myCustomButton',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateClick}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          datesSet={handleDatesSet}
          selectOverlap={true}
          eventChange={handleMove}
          rerenderDelay={50}

          scrollTime="00:06:00"
        />
      </div>
      <div className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {eventState.isEditing && <EventMenu
          onDelete={handleDelete}
          onSave={handleSave}
          onClose={handleClose}
          onCreate={handleCreate}
          start={clickInfo.startStr}
          event={clickInfo.event}
          isNewEvent={eventState.isNewEvent}
          admin={admin}


        />}
      </div>
    </div>
  );
};

export default CalendarComponent;
