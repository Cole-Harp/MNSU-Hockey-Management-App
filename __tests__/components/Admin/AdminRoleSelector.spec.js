import React from 'react';
import { render, screen, fireEvent, toHaveBeenCalledWith } from '@testing-library/react';
import AdminRoleSelector from '../../../src/Components/Admin/AdminRoleSelector';
import { UserRole } from '@prisma/client';

describe('AdminRoleSelector', () => {
    const mockOnSelect = jest.fn();

    beforeEach(() => {
        render(<AdminRoleSelector role={undefined} onSelect={mockOnSelect} />);
    });

    test('should render without crashing', () => {
        expect(screen.getByText(/Select Role/i)).toBeInTheDocument();
    });

    test('should select a role and call onSelect callback', async () => {
        // Open the dropdown
        fireEvent.mouseDown(screen.getByRole('combobox'));
        // Select an option
        const option = await screen.findByText('Faculty');
        fireEvent.click(option);
        expect(mockOnSelect).toHaveBeenCalledWith(UserRole.Faculty);
    });

});
