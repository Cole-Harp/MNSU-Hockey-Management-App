import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarPage: React.FC = () => {
  return (
    <div>
      <h2>Calendar and Scheduler</h2>
      <Calendar />
    </div>
  );
};

export default CalendarPage;