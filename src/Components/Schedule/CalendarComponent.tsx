"use client";
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { User, UserRole } from '@prisma/client';
import EventMenu from './CalendarEventMenu/EventMenu';
import { createEvent, deleteEvent, updateEvent, userGetEvents } from '../../lib/db_actions/Event';
import iCalendarPlugin from '@fullcalendar/icalendar'
import EventEditor from './CalendarEventMenu/EventEditor';
import { usePusher } from '@/Components/pusherContextProvider';
import listPlugin from '@fullcalendar/list';




type CalendarProps = {
  isAdmin: boolean;
  events: any[];
  currUser: User;
};

function CalendarComponent({ isAdmin, currUser, events }: CalendarProps) {
  const { pusher } = usePusher();
  const calendarRef = useRef<FullCalendar>(null);
  const [eventsState, setEventsState] = useState<any[]>(events);
  const [showAnnouncementsOnly, setShowAnnouncementsOnly] = useState(false);
  const [showAgendaOnly, setShowAgendaOnly] = useState(false);
  const [calendar, setCalendar] = useState<any>(null)
  const [clickInfo, setClickInfo] = useState<any>(null);
  const [eventState, setEventState] = useState({
    isEditing: false,
    isNewEvent: false,
    isLooking: false
  });




  useEffect(() => {
    const handleResize = () => {
      if (calendarRef.current) {
        if (window.innerWidth >= 768) {
          calendarRef.current.getApi().changeView('timeGridWeek');
        } else {
          calendarRef.current.getApi().changeView('listWeek');
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [calendarRef]);

  const addEvent = (event: any) => {
  
    const existingEventIndex = eventsState.findIndex((e) => e.id === event.id);
    if (existingEventIndex !== -1) {
      const updatedEvents = [...eventsState];
      updatedEvents.splice(existingEventIndex, 1);
      updatedEvents.push(event);
      setEventsState(updatedEvents);
    } else {
      setEventsState([...eventsState, event]);
    }
  }


  useEffect(() => {
    if (pusher) {
      var channel = pusher.subscribe('announcements');
      channel.bind(`new-${currUser.role}`, function(data: any) {
        alert(JSON.stringify(data));
        console.log("New announcement event received");
        addEvent(data);
      });
      
    }
  }, [pusher, addEvent, currUser.role]);



  useEffect(() => {
    if (calendarRef.current && calendarRef.current.getApi) {
      const calendarApi = calendarRef.current.getApi()
      setCalendar(calendarApi)
    }
  }, [calendarRef, calendarRef.current]);
   

  const handleDateClick = async (selectInfo: { view: { calendar: any; }; startStr: any; endStr: any; allDay: any; }) => {
    if (!eventState.isEditing && !eventState.isLooking) {
    setClickInfo(selectInfo);
    setEventState({ ...eventState, isNewEvent: true, isEditing: true });
  }

  };

  const handleEventClick = async (clickInfo: any) => {
    setClickInfo(clickInfo);
    setEventState({ isNewEvent: false, isEditing: false, isLooking: true });
  
  };


  const handleChange = async (changeInfo: { event: any; }) => {
    const event = changeInfo.event;
    const start = new Date(event.startStr);
    const end = new Date(event.endStr);
    const allDay = event.allDay;

    if (allDay) {
      // Docs say add 1 day to the start and end
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

  const handleCreate = () => {
    setEventState({ ...eventState, isNewEvent: true, isEditing: true })
  }

  function handleEdit(): any {
    setEventState({ ...eventState, isEditing: true, isLooking: false });
  }

  const handleDelete = async () => {
    const eventId = clickInfo.event.id;
    await deleteEvent(eventId);
    setEventsState(prevState => prevState.filter(event => event.id !== eventId));
    clickInfo.event.remove();

  };

  function handleClose(): any {
    setEventState({ ...eventState, isEditing: false, isLooking: false });
    setClickInfo(null);
  }


  const toggleAnnouncementsView = () => {
    setShowAnnouncementsOnly(false);
    setShowAgendaOnly(false)
    setShowAnnouncementsOnly(!showAnnouncementsOnly);
  };

  const toggleAgendaView = () => {
    setShowAnnouncementsOnly(false);
    calendar.changeView('listWeek');
    setShowAgendaOnly(!showAgendaOnly);
  };
  
  function getEventById(id?: string) {
      const event = eventsState.find((event) => event.id === clickInfo?.event?.id) ?? clickInfo;
      return event;
  }

function eventFilter() {
  if (showAnnouncementsOnly) {
    return eventsState.filter(event => event.announcement)
  }
  else if (showAgendaOnly) {
    return eventsState.filter(event => event.announcement) // Change to Agenda view no time
  } 
  else {
    return eventsState
  }
}





  return (
    <div className='m-3 w-full'>
      <div>
        <>
        <div className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          {eventState.isEditing && <EventEditor calendar={calendar} event={getEventById() || undefined} clickInfo={clickInfo} currUserRole={currUser.role} isNewEvent={eventState.isNewEvent} isAdmin={isAdmin} onClose={handleClose} addEvent={addEvent} removeEvent={handleDelete} />}
        </div>
        </>



        <FullCalendar ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, iCalendarPlugin]}
          customButtons={{
            toggleAnnouncements: {
              text: "Team Schedule",
              click: toggleAnnouncementsView,
            },
            toggleAgenda: {
              text: "Agenda",
              click: toggleAgendaView,
              hint: "Agenda View",

            },
            createEvent: {
              text: "+",
              click: handleCreate,

            },
          }}
          headerToolbar={{
            left: "dayGridMonth,timeGridWeek,timeGridDay,listWeek,createEvent",
            center: "title",
            right: "prev,next today toggleAnnouncements toggleAgenda",
          }}

          initialView="dayGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateClick}
          eventClick={handleEventClick}
          selectOverlap={true}
          // events={eventFilter()}
          events = {{
            url: 'https://calendar.google.com/calendar/ical/colerharp%40gmail.com/public/basic.ics',
            format: 'ics' // important!
          }}
          
          
          eventChange={handleChange}
          firstDay={1}


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

// function toEvents(events: any[]) {
//   // Filter events if 'showAnnouncementsOnly' is true
//   // Default to false for initial render
//   let filteredEvents = showAnnouncementsOnly ?? false  // Default to false for initial render
//     ? events.filter(event => event.announcement)
//     : events;

//   // Transform the filtered events to the format expected by FullCalendar
//   return filteredEvents.map(event => {
//     const daysOfWeek = event.daysOfWeek ? JSON.parse(event.daysOfWeek) as string[] : undefined;
//     var currEvent: any = {
//       id: event.id,
//       title: event.title,
//       allDay: event.allDay,
//       backgroundColor: event.backgroundColor,
//       extendedProps: {
//         where: event.where,
//         description: event.description,
//         role: event.role,
//         authorId: event.authorId,
//         announcement: event.announcement
//         // For some reason cant acess recur data in event editor


//       }
//     };

//     // Handling for recurring events
//     if (daysOfWeek && daysOfWeek.length > 0) {
//       currEvent = {...currEvent,
//         daysOfWeek: daysOfWeek,
//         startTime: event.startTime,
      
//         endTime: event.endTime,
//         startRecur: event.startRecur,
//         endRecur: event.endRecur,
//         editable: false,}

//     } else {
//       // Non-recurring event dates
//       currEvent.start = event.start;
//       currEvent.end = event.end;
//     }

//     return currEvent;
//   });
// }