"use client";

import { User, UserRole } from '@prisma/client';
import { updateUser } from "@/lib/db_actions/Auth";
import { useState } from "react";
import Select from 'react-select';
import AdminRoleSelector from './AdminRoleSelector';

type AdminUserEditorProps = {
  user_list: User[];
};

export function AdminUserEditor({ user_list }: AdminUserEditorProps) {
  const [selectedUser, setSelectedUser] = useState<User>();
  const [userEditorToggle, setUserEditorToggle] = useState<boolean>(false)

  const handleSaveChanges = () => {
    if (selectedUser) {
      updateUser(selectedUser)
    }
  };

  // Mapping user_list to options for react-select
  const userOptions = [
    ...user_list.map((user) => ({
      value: user.id,
      label: user.name,
    })),
  ];


  return (
    <div>
      <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-2 ml-3 rounded mt-4" onClick={() => setUserEditorToggle(!userEditorToggle)}>Toggle User Editor</button>
      {userEditorToggle ? (
        <div className='my-2 m-2 bg-gray-200 rounded-md p-2'>
          <div className="z-40 flex items-center pointer-events-auto">

            <div data-testid="user-selector">
              <Select options={userOptions} 
              value={userOptions.find((userOptions) => userOptions.value === selectedUser?.id)} 
              onChange={(option) => setSelectedUser(user_list.find(user => user.id === option?.value))} 
              placeholder={'Select User'} 
              className="z-50 w-64 pointer-events-auto m-1" />
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
                <div className="flex-col">
                  <label className="text-gray-700 font-bold mb-2" htmlFor="name">
                    Name:
                    <div>
                      {selectedUser.name}
                    </div>
                  </label>
                </div>
                <div className="flex">
                  {/* Set the role of user object then update */}
                  <AdminRoleSelector onSelect={(role) => setSelectedUser({ ...selectedUser, role: role ?? UserRole.Player })} role={selectedUser.role} />
                </div>
              </div>
              <button
                onClick={handleSaveChanges}
                className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded mt-4"
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

