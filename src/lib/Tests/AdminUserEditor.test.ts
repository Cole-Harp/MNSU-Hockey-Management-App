import { render, screen, fireEvent } from "@testing-library/react";
import { AdminUserEditor } from "../../Components/Admin/AdminUserEditor";
import { getAllUsers, updateUser } from "@/lib/db_actions/Auth";
import '@testing-library/jest-dom';

jest.mock("../db_actions/Auth");

describe("AdminUserEditor", () => {
  const users = [
    { id: 1, name: "John", email: "john@example.com", role: "Faculty" },
    { id: 2, name: "Jane", email: "jane@example.com", role: "Coach" },
    { id: 3, name: "Bob", email: "bob@example.com", role: "Admin" },
  ];

  beforeEach(() => {
    (getAllUsers as jest.Mock).mockResolvedValue(users);
    jest.mock("../../Components/Admin/AdminUserEditor");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAllUsers", () => {
    it("returns an array of users", async () => {
      const users = await getAllUsers();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
      expect(users[0]).toHaveProperty("id");
      expect(users[0]).toHaveProperty("name");
      expect(users[0]).toHaveProperty("email");
      expect(users[0]).toHaveProperty("role");
    });
  });

  it("renders the user options based on the selected role", async () => {
    const roleSelectElement = screen.getByLabelText(/Select Role/i);
    fireEvent.change(roleSelectElement, { target: { value: "Admin" } });
    const userSelectElement = await screen.findByLabelText(/select users/i);
    expect(userSelectElement).toBeInTheDocument();
    expect(userSelectElement).toHaveTextContent("Bob");
  });

});