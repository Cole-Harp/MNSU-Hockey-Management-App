
import { AdminUserEditor } from "@/Components/Admin/AdminUserEditor";
import { render, screen, fireEvent, getByLabelText, within, act, waitForElement, queryByTestId, find } from "@testing-library/react";


const user_list = [
  { id: '1', name: 'John Doe', role: 'Admin' },
  { id: '2', name: 'John Doge', role: "Player" }
];

describe('AdminUserEditor Component', () => {

  beforeEach(() => {
    render(<AdminUserEditor user_list={user_list}/>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders AdminUserEditor without crashing', () => {
    const toggleButton = screen.getByText('Toggle User Editor');
    expect(toggleButton).toBeInTheDocument();
  });

  test('renders users dropdown appears after clicking Toggle User Editor button', () => {
    const toggleButton = screen.getByText('Toggle User Editor');
    fireEvent.click(toggleButton);
    const selectUsers = screen.getByText('Select User');
    expect(selectUsers).toBeInTheDocument();
  });
  
  test('Edit User section appears after a user is selected using arrows', async () => {
    const toggleButton = screen.getByText('Toggle User Editor');
    fireEvent.click(toggleButton);
    const selectUsers = await screen.getByText("Select User");
    fireEvent.keyDown(selectUsers, { key: "ArrowDown" });
    const existingItem = await screen.findByText('John Doe')
    fireEvent.click(existingItem);
    const editUser = screen.queryByText('Edit User');
    const name = screen.queryByText('Name:');
    expect(editUser).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  test('Edit User section appears after a user is selected', async () => {
    const toggleButton = screen.getByText('Toggle User Editor');
    fireEvent.click(toggleButton);
    fireEvent.mouseDown(screen.getByRole('combobox'));
    const option = await screen.findByText('John Doe');
    fireEvent.click(option);
 
    const editUser = screen.queryByText('Edit User');
    const name = screen.queryByText('Name:');
    expect(editUser).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  test('Toggles the user editor on then off', async () => {
    const toggleButton = screen.getByText('Toggle User Editor');
    fireEvent.click(toggleButton);
    const selectUsers = screen.getByText('Select User');
    fireEvent.keyDown(selectUsers, { key: "ArrowDown" });
    const existingItem = await screen.findByText('John Doe')
    fireEvent.click(existingItem);
    fireEvent.click(toggleButton);
    const editUser = screen.queryByText('Edit User');
    expect(editUser).not.toBeInTheDocument();
  });

});