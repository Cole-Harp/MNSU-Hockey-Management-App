import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventMenu from '../../../src/Components/Schedule/CalendarEventMenu/EventMenu';

// Mocks for external dependencies
jest.mock('@iconify/react', () => ({
  Icon: () => <span>Icon</span>
}));

describe('EventMenu', () => {
  const mockOnClose = jest.fn();
  const mockOnEdit = jest.fn();
  const eventMock = {
    title: 'Test Event',
    start: '2023-01-01T12:00:00',
    allDay: true,
    where: 'Test Location',
    description: 'Test Description',
    backgroundColor: '#fff',
    daysOfWeek: '[1,2,3]'
  };

  beforeEach(() => {
    render(<EventMenu onClose={mockOnClose} onEdit={mockOnEdit} event={eventMock} admin={true} />);
  });

  test('renders without crashing', () => {
    expect(screen.getByText('Test Event')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    fireEvent.click(screen.getByText('x'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('Renders Days of week', () => {
    expect(screen.getByText('Days of Week'));
    expect(screen.getByText('Monday, Tuesday, Wednesday'));
  });
});
