
import { AdminUserEditor } from "@/Components/Admin/AdminUserEditor";
import { render, screen, fireEvent, getByLabelText, within, act, waitForElement, queryByTestId, find } from "@testing-library/react";





// Mock the external dependencies



// Mock the entire authActions module

const user_list =         [{ id: '1', name: 'John Doe', role: 'Admin' },
{ id: '2', name: 'John Doge', role: "Player" }];

describe('AdminUserEditor Component', () => {
  beforeEach(() => {
    
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders AdminUserEditor without crashing', () => {
    render(<AdminUserEditor user_list={user_list}/>);
    const toggleButton = screen.getByText('Toggle User Editor');
    expect(toggleButton).toBeInTheDocument();
  });
  
  // Test 2: Check if the "Toggle User Editor" button works as expected
  it('Toggle User Editor button works correctly', () => {
    render(<AdminUserEditor user_list={user_list}/>);
    const toggleButton = screen.getByText('Toggle User Editor');
    fireEvent.click(toggleButton);
    const selectRole = screen.getByText('Select Role');
    expect(selectRole).toBeInTheDocument();
  });

  it('Select Users dropdown appears after clicking Toggle User Editor button', () => {
    render(<AdminUserEditor user_list={user_list}/>);
    const toggleButton = screen.getByText('Toggle User Editor');
    fireEvent.click(toggleButton);
    const selectUsers = screen.getByText('Select Users');
    expect(selectUsers).toBeInTheDocument();
  });



  
  // Test 4: Check if the "Edit User" section appears after a user is selected
  it('Edit User section appears after a user is selected', async () => {
    render(<AdminUserEditor user_list={user_list} />);
    const toggleButton = screen.getByText('Toggle User Editor');
    fireEvent.click(toggleButton);
    const selectUsers = await screen.getByText("Select Users");
    fireEvent.keyDown(selectUsers, { key: "ArrowDown" });
    const existingItem = await screen.findByText('John Doe')
    fireEvent.click(existingItem);
    const editUser = screen.queryByText('Edit User');
    const name = screen.queryByText('Name:');
    expect(editUser).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  // Test 5: Check if the "Edit User" section disappears after the "Toggle User Editor" button is clicked
  it('Edit User section disappears after the "Toggle User Editor" button is clicked', async () => {
    render(<AdminUserEditor user_list={user_list} />);
    const toggleButton = screen.getByText('Toggle User Editor');
    fireEvent.click(toggleButton);
    const selectUsers = screen.getByText('Select Users');
    fireEvent.keyDown(selectUsers, { key: "ArrowDown" });
    const existingItem = await screen.findByText('John Doe')
    fireEvent.click(existingItem);
    fireEvent.click(toggleButton);
    const editUser = screen.queryByText('Edit User');
    expect(editUser).not.toBeInTheDocument();
  });

});