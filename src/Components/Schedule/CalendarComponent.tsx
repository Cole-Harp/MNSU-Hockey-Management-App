"use client";
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { User, UserRole } from '@prisma/client';
import EventMenu from './CalendarEventMenu/EventMenu';
import { createEvent, deleteEvent, updateEvent } from '../../lib/db_actions/Event';
import iCalendarPlugin from '@fullcalendar/icalendar'
import EventEditor from './CalendarEventMenu/EventEditor';
import { usePusher } from '@/lib/socket/pusherContextProvider';
import listPlugin from '@fullcalendar/list';
import { vi } from 'date-fns/locale';


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
  const [showDropdown, setShowDropdown] = useState(false);
  const [clickInfo, setClickInfo] = useState<any>(null);
  const [eventState, setEventState] = useState({
    isEditing: false,
    isNewEvent: false,
    isLooking: false
  });

  useEffect(() => {
    // This is really just for the Admin Filter
    setEventsState(events);
  }, [events]);


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

  //Adds or updates event in eventsState Array
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
      channel.bind(`new-${currUser.role}`, function (data: any) {
        // alert(JSON.stringify(data));
        console.log("New announcement event received");
        addEvent(data);
      });

    }
  }, [pusher, addEvent, currUser.role]);

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
    let event = changeInfo.event;
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
    event = await updateEvent(event.id, newEvent);
    addEvent(event);
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
    calendarRef.current?.getApi().changeView('listWeek');
    setShowAgendaOnly(!showAgendaOnly);
  };



  const toggleDropdownView = () => {
    setShowDropdown(!showDropdown);

  };

  const getEventById = () => {
    const event = eventsState.find((event) => event.id === clickInfo?.event?.id) ?? clickInfo;
    return event;
  }

  const eventFilter = () => {
    if (showAnnouncementsOnly) {
      return eventsState.filter(event => event.announcement)
    }
    else if (showAgendaOnly) {
      return eventsState.filter(event => event.announcement) // Change to Agenda view for client next project
    }
    else {
      return eventsState
    }
  }

  const handleViewChange = (viewName: string) => {
    if (viewName === 'createEvent') {
      handleCreate();
      setShowDropdown(false);
      return;
    }
    else if (viewName === 'toggleAnnouncements') {
      toggleAnnouncementsView();
      setShowDropdown(false);
      return;
    }
    else if (viewName === 'toggleAgenda') {
      toggleAgendaView();
      setShowDropdown(false);
      return;
    }
    else {
      const calendarApi = calendarRef!.current!.getApi();
      calendarApi.changeView(viewName);
      setShowDropdown(false);
    }
  };

  return (
    <div className='m-3 w-full'>


      <div className={`absolute right-5 top-20 transform transition duration-300 ${showDropdown ? 'translate-x-0 opacity-100 visible' : '-translate-x-full opacity-0 invisible'} z-50`}>
        <DropdownMenu onSelect={handleViewChange} />
      </div>
      <div className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>

        {eventState.isEditing && <EventEditor event={getEventById() || undefined} clickInfo={clickInfo} currUserRole={currUser.role} isNewEvent={eventState.isNewEvent} isAdmin={isAdmin} onClose={handleClose} addEvent={addEvent} removeEvent={handleDelete} updateEvent={(id, event) => updateEvent(id, event)} createEvent={(event) => createEvent(event)} />}
      </div>
      <div>
        <FullCalendar ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, iCalendarPlugin]}
          customButtons={{
            dropdown: {
              text: 'Views',
              click: toggleDropdownView,
            },

          }}
          headerToolbar={{
            left: "",
            center: "title",
            right: "today dropdown prev next",
          }}

          initialView="dayGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateClick}
          eventClick={handleEventClick}
          selectOverlap={true}
          events={eventFilter()}
          eventChange={handleChange}
          firstDay={1}
          allDayText='All Day'
          slotLabelInterval={{ hours: 1 }}
          slotDuration={{ minutes: 30 }}
          scrollTime={'06:00:00'}
          buttonText={{ today: 'Today' }}

        />
      </div>
      <div className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {(eventState.isLooking) && <EventMenu
          onEdit={handleEdit}
          onClose={handleClose}
          event={getEventById() || undefined}
          isNewEvent={eventState.isNewEvent}
          admin={currUser.role === UserRole.Admin}

        />}
      </div>
    </div>
  );
};

export default CalendarComponent;


// TODO: Move to own file
const DropdownMenu = ({ onSelect }: any) => {
  const [activeOption, setActiveOption] = useState('');

  const handleSelect = (view: string) => {
    if (view === 'toggleAgenda' || view === 'toggleAnnouncements') {
      setActiveOption(current => (current === view ? '' : view));
      onSelect(view);
    } else {
      onSelect(view);
    }
  };

  return (
    <div className="z-50 fixed right-5 top-20">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300 p-3">
        <ul className="space-y-1">
          <li>
            <button
              className={`flex items-center justify-start px-4 py-2 rounded-md text-gray-700 hover:text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 w-full transition duration-150 ease-in-out ${activeOption === 'toggleAgenda' ? 'bg-purple-400 text-white' : 'bg-gray-100'}`}
              onClick={() => handleSelect('toggleAgenda')}
            >
              <span className="flex-1">Team Events</span>
            </button>
          </li>
          <li>
            <button
              className={`flex items-center justify-start px-4 py-2 rounded-md text-gray-700 hover:text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 w-full transition duration-150 ease-in-out ${activeOption === 'toggleAnnouncements' ? 'bg-purple-400 text-white' : 'bg-gray-100'}`}
              onClick={() => handleSelect('toggleAnnouncements')}
            >
              <span className="flex-1">Announcements</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-start px-4 py-2 rounded-md text-gray-700 hover:text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 w-full transition duration-150 ease-in-out bg-gray-100"
              onClick={() => handleSelect('listWeek')}
            >
              <span className="flex-1">List</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-start px-4 py-2 rounded-md text-gray-700 hover:text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 w-full transition duration-150 ease-in-out bg-gray-100"
              onClick={() => handleSelect('timeGridDay')}
            >
              <span className="flex-1">Day</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-start px-4 py-2 rounded-md text-gray-700 hover:text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 w-full transition duration-150 ease-in-out bg-gray-100"
              onClick={() => handleSelect('dayGridMonth')}
            >
              <span className="flex-1">Month</span>
            </button>
          </li>


          <li>
            <button
              className="flex items-center justify-start px-4 py-2 rounded-md text-gray-700 hover:text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 w-full transition duration-150 ease-in-out bg-gray-100"
              onClick={() => handleSelect('timeGridWeek')}
            >
              <span className="flex-1">Week</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-start px-4 py-2 rounded-md text-gray-700 hover:text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 w-full transition duration-150 ease-in-out bg-gray-100"
              onClick={() => handleSelect('createEvent')}
            >
              <span className="flex-1">Create Event</span>
            </button>
          </li>
        </ul>
      </div>
    </div>

  );
};
