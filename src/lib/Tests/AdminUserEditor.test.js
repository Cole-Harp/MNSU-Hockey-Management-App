import { render, fireEvent } from '@testing-library/react';
import { AdminUserEditor } from '../../Components/Admin/AdminUserEditor';
import { getAllUsers } from '../db_actions/Auth'
jest.mock("../db_actions/Auth.tsx", () => ({
  getAllUsers: jest.fn(),
}));
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useState: jest.fn(),
    useEffect: jest.fn(),
  };
});

describe('AdminUserEditor', () => {
  beforeEach(() => {
    getAllUsers.mockClear();
  });
  
  it('fetches users on mount', () => {
    render(<AdminUserEditor />);
    expect(getAllUsers).toHaveBeenCalledTimes(1);
  });

  it('updates selectedUser when selectedPerson changes', () => {
  });

  it('updates selectedUser when handleInputChange is called', () => {
    const { getByLabelText } = render(<AdminUserEditor />);
    const input = getByLabelText('input');
    fireEvent.change(input, { target: { value: 'new value' } });
  });
  it('saves changes when handleSaveChanges is called', () => {
  });
});