import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventEditor from '../../../src/Components/Schedule/CalendarEventMenu/EventEditor.tsx';

describe('EventEditor Component', () => {
    const mockClose = jest.fn();
    const mockAddEvent = jest.fn();
    const mockCreateEvent = jest.fn();
    const mockUpdateEvent = jest.fn();
    const mockRemoveEvent = jest.fn();
    const defaultProps = {
        clickInfo: {},
        isNewEvent: true,
        isAdmin: true,
        currUserRole: 'User',
        onClose: mockClose,
        addEvent: mockAddEvent,
        removeEvent: mockRemoveEvent,
        mockUpdateEvent: mockUpdateEvent,
        mockCreateEvent: mockCreateEvent,
    };

    it('should fill and submit the form', () => {
        render(<EventEditor {...defaultProps} />);

        // Fill the Title input
        const titleInput = screen.getByPlaceholderText('Title');
        fireEvent.change(titleInput, { target: { value: 'Meeting' } });
        expect(titleInput.value).toBe('Meeting');

        // Fill the Where input
        const whereInput = screen.getByPlaceholderText('Where');
        fireEvent.change(whereInput, { target: { value: 'Conference Room' } });
        expect(whereInput.value).toBe('Conference Room');

        // Fill the Description textarea
        const descriptionInput = screen.getByPlaceholderText('Description');
        fireEvent.change(descriptionInput, { target: { value: 'Team meeting to discuss project updates.' } });
        expect(descriptionInput.value).toBe('Team meeting to discuss project updates.');

        // Check and test the 'All Day' checkbox
        const allDayCheckbox = screen.getByLabelText('All Day');
        fireEvent.click(allDayCheckbox);
        expect(allDayCheckbox.checked).toBeTruthy();
        fireEvent.click(allDayCheckbox);
        expect(allDayCheckbox.checked).toBeFalsy();

        // Test Date input when 'All Day' is checked
        const dateInput = screen.getByPlaceholderText('Date');
        fireEvent.change(dateInput, { target: { value: '2023-12-25' } });
        expect(dateInput.value).toBe('2023-12-25');

        // Check and test the 'Recurring' checkbox
        const recurringCheckbox = screen.getByTitle('Recurring');
        fireEvent.click(recurringCheckbox);
        expect(recurringCheckbox.checked).toBeTruthy();

        const startRecurInput = screen.getByPlaceholderText('Start Recurrence Date');
        fireEvent.change(startRecurInput, { target: { value: '2023-12-01' } });
        expect(startRecurInput.value).toBe('2023-12-01');

        // Test 'End Recurrence Date' input
        const endRecurInput = screen.getByPlaceholderText('End Recurrence Date');
        fireEvent.change(endRecurInput, { target: { value: '2023-12-31' } });
        expect(endRecurInput.value).toBe('2023-12-31');

        // Test Start Time input (for non-recurring events)
        const startTimeInput = screen.getByPlaceholderText('Start Date and Time');
        fireEvent.change(startTimeInput, { target: { value: '09:00' } });
        expect(startTimeInput.value).toBe('09:00');

        // Test End Time input (for non-recurring events)
        const endTimeInput = screen.getByPlaceholderText('End Date and Time');
        fireEvent.change(endTimeInput, { target: { value: '10:00' } });
        expect(endTimeInput.value).toBe('10:00');

        // Test the 'Announcement' checkbox and role selector for admins
        if (defaultProps.isAdmin) {
            const announcementCheckbox = screen.getByTitle('All Day');
            fireEvent.click(announcementCheckbox);
            expect(announcementCheckbox.checked).toBeTruthy();
        }
    });
});

