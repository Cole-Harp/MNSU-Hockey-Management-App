import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalendarComponent from '@/Components/Schedule/CalendarComponent.tsx';

// Mock the usePusher function
// jest.mock('../src/lib/socket/pusherContextProvider', () => ({
//   usePusher: () => ({ pusher: {} }),
// }));

describe('CalendarComponent', () => {
  const sampleEvents = [
    {
      id: '1',
      title: 'Meeting with Client',
      description: 'Discuss project requirements',
      start: '2023-12-01T10:00:00Z',
      end: '2023-12-01T12:00:00Z',
      allDay: false,
      backgroundColor: 'blue',
      where: 'Conference Room A',
      announcement: false,
      authorId: 'user1',
      role: 'USER',
    },
    {
      id: '2',
      title: 'Team Standup',
      description: 'Daily team status update',
      start: '2023-12-02T09:30:00Z',
      end: '2023-12-02T10:00:00Z',
      allDay: false,
      backgroundColor: 'green',
      where: 'Office',
      announcement: false,
      authorId: 'user2',
      role: 'USER',
    },
    {
      id: '3',
      title: 'Project Kickoff',
      description: 'Start of the new project',
      start: '2023-12-03T14:00:00Z',
      end: '2023-12-03T16:00:00Z',
      allDay: false,
      backgroundColor: 'orange',
      where: 'Online',
      announcement: true,
      authorId: 'user3',
      role: 'ADMIN',
    },
  ];

  // it('renders without errors', () => {
  //   render(
  //     <CalendarComponent isAdmin={true} currUser={{}} events={sampleEvents} />
  //   );

  //   // Ensure that the component renders without errors
  //   // You can add more specific assertions based on your component's content
  //   expect(screen.getByTestId('calendar')).toBeInTheDocument();
  // });

  it('displays "Show Announcements" button', () => {
    render(
      <CalendarComponent isAdmin={true} currUser={{}} events={sampleEvents} />
    );

    // Ensure that the "Show Announcements" button is present
    expect(screen.getByText('Show Announcements')).toBeInTheDocument();
  });

  it('displays "Create Event" button', () => {
    render(
      <CalendarComponent isAdmin={true} currUser={{}} events={sampleEvents} />
    );

    // Ensure that the "Create Event" button is present
    expect(screen.getByText('Create Event')).toBeInTheDocument();
  });

  // it('handles clicking "Show Announcements" button', () => {
  //   render(
  //     <CalendarComponent isAdmin={true} currUser={{}} events={sampleEvents} />
  //   );

  //   // Click the "Show Announcements" button
  //   fireEvent.click(screen.getByText('Show Announcements'));

  //   // Add assertions based on the expected behavior when the button is clicked
  //   // For example, you can check if the component state or UI changes as expected
  // });

  it('handles clicking "Create Event" button', () => {
    render(
      <CalendarComponent isAdmin={true} currUser={{}} events={sampleEvents} />
    );

    // Click the "Create Event" button
    fireEvent.click(screen.getByText('Create Event'));

    // Add assertions based on the expected behavior when the button is clicked
    // For example, you can check if the component state or UI changes as expected
  });
});
