import { createEvent } from '@/lib/db_actions/Event';
import { render, screen, fireEvent } from '@testing-library/react';
import CalendarComponent from '@/Components/Schedule/CalendarComponent';

jest.mock('@clerk/nextjs', () => ({
currentUser: jest.fn().mockImplementation(() => {
    return { id: 'mockUserId', name: 'Mock User' };
}),
}));
  
jest.mock('../../../src/lib/db_actions/Auth', () => ({
getUser: jest.fn().mockResolvedValue({
    id: 'mockUserId',
    name: 'Mock User',

    }),
}));

jest.mock('../../../src/lib/db_actions/Event', () => ({
    createEvent: jest.fn().mockResolvedValue({
        id: 'mockEventId',
        title: 'Mock Event',
        // Other properties
        }),
    updateEvent: jest.fn().mockResolvedValue({
        id: 'mockEventId',
        title: 'Mock Event',
        // Other properties
        }),
        // Other mocks
    }));

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


describe('CalendarComponent', () => {      
    
    beforeEach(() => {
      render(<CalendarComponent isAdmin={true} currUser={{}} events={sampleEvents} />);
    });

    test('should allow creating a new event using button', () => {
    
        fireEvent.click(screen.getByTitle('Views'));
        fireEvent.click(screen.getByText('Create Event'));
    
        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Event Title' } });
        fireEvent.change(screen.getByLabelText('Where'), { target: { value: 'New Location' } });
        fireEvent.change(screen.getByPlaceholderText('Start Date and Time'), { target: { value: '2023-12-11T00:00:00.000Z' } });
        fireEvent.change(screen.getByPlaceholderText('End Date and Time'), { target: { value: '2023-12-11T02:00:00.000Z' } });
    
        // Submit the form
        fireEvent.click(screen.getByText('Submit'));
    
        expect(createEvent).toHaveBeenCalled();
      });

});
