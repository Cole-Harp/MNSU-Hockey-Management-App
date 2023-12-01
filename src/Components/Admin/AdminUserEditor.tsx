"use client";

import { User, UserRole } from '@prisma/client';
import { updateUser } from "@/lib/db_actions/Auth";
import { useState } from "react";
import Select from 'react-select';

type AdminUserEditorProps = {
  user_list: User[];
};

export function AdminUserEditor({user_list}: AdminUserEditorProps) {
  const [selectedRole, setSelectedRole] = useState<string>();
  const [users] = useState<User[]>(user_list);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [userEditorToggle, setUserEditorToggle] = useState<boolean>(false)


  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    if (selectedUser && typeof selectedUser === 'object') {
      setSelectedUser({ ...selectedUser, [event.target.name]: event.target.value });
    }
  };
  const handleSaveChanges = () => {
    if (selectedUser) {
      updateUser(selectedUser)
    }
  };

  const userOptions = [
    ...users.filter(user => selectedRole ? user.role === selectedRole : true).map((user) => ({
      value: user.id,
      label: user.name,
    })),
  ];

  const roleOptions = [
    { value: UserRole.Faculty, label: 'Faculty' },
    { value: UserRole.Coach, label: 'Coaches' },
    { value: UserRole.Admin, label: 'Admin' },
    { value: UserRole.Player, label: 'Player' },
  ];

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 ml-3 rounded mt-4" onClick={() => setUserEditorToggle(!userEditorToggle)}>Toggle User Editor</button>
      {userEditorToggle ? (
        <div className='my-2 m-2 bg-gray-200 rounded-md p-2'>
          <div className="z-40 flex items-center pointer-events-auto">
          <div data-testid="role-selector">
            <Select options={roleOptions} value={roleOptions.find((option) => option.value === selectedRole)} onChange={(option) => setSelectedRole(option?.value)} data-testid="role-select" aria-label="Select Role" placeholder="Select Role" className="z-50 pointer-events-auto w-64 m-1" />
          </div>
          <div data-testid="user-selector">
          <Select options={userOptions} value={userOptions.find((userOptions) => userOptions.value === selectedUser?.id)} onChange={(option) => setSelectedUser(users.find(user => user.id === option?.value))} placeholder={'Select Users'} className="z-50 w-64 pointer-events-auto m-1" />
          </div>
          </div>
          {selectedUser && (
            <div className='w-auto m-1 border '>
              <h2 className="text-xl font-bold my-2">Edit User</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-bold mb-2" htmlFor="id">
                    ID:
                  </label>
                  <span className="text-gray-700">{selectedUser.id}</span>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-bold mb-2" htmlFor="email">
                    Email: {selectedUser.email}
                  </label>
                  
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-bold mb-2" htmlFor="name">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={selectedUser.name ?? undefined}
                    onChange={handleInputChange}
                    className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-bold mb-2" htmlFor="role">
                    Role:
                  </label>
                  <Select
                    classNamePrefix='role-change'
                    options={roleOptions}
                    value={roleOptions.find((option) => option.value === selectedUser.role)}
                    onChange={(option) => setSelectedUser({ ...selectedUser, role: option?.value ?? "Player" })}
                    className="z-50 w-full"
                  />
                </div>
              </div>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

