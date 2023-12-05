"use client";
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { User, UserRole } from '@prisma/client';
import { adminGetEvents } from '../../lib/db_actions/Event';
import { FilterComponent } from './AdminFilter';
import CalendarComponent from '../Schedule/CalendarComponent';

const MyContext = createContext([]);

type AdminCalendarProps = {
  isAdmin: boolean;
  currUser: User;
  user_list: User[];
};


export function AdminCalendarComponent({ isAdmin, currUser, user_list }: AdminCalendarProps) {
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);


  // Fetches events based on the selected roles and persons.

  async function fetchEvents() {
    if (isAdmin) {
      const fetchedEvents = await adminGetEvents(selectedPersons, selectedRoles) as any[];
      setUserEvents(fetchedEvents);
    }
  }

  useEffect(() => {
    fetchEvents();
    console.log(selectedPersons, selectedRoles, "HERE")
  }, [selectedRoles, selectedPersons, isAdmin]);

  // Handles the filter change event.

  const handleFilter = useCallback(async (selectedRole: UserRole[], selectedPerson: string[]) => {
    setSelectedRoles(selectedRole);
    setSelectedPersons(selectedPerson);
  }, []);

  return (
    <div>
      <FilterComponent onFilter={handleFilter} user_list={user_list} />
      <CalendarComponent isAdmin={isAdmin} currUser={currUser} events={userEvents} />
    </div>
  );
}

export default AdminCalendarComponent;
