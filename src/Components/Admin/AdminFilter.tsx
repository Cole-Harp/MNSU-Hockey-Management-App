"use client";

import { User, UserRole } from '@prisma/client';
import { useState } from "react";
import Select from 'react-select';


interface FilterProps {
  onFilter: (selectedRole?: any, selectedPerson?: any) => void;
  user_list: User[];
}

export function FilterComponent({ user_list, onFilter }: FilterProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole[]>([]);
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);

  const userOptions = [
    { value: 'all', label: 'All Users' },
    { value: "me", label: 'Me' },
    ...user_list.map((user) => ({
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
    <div className='my-2 z-40 flex'>
      <button
        className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 ml-3 rounded"
        onClick={() => onFilter(selectedRole, selectedPersons)}
      >
        Apply filters
      </button>
      <div className="z-40 flex items-center pointer-events-auto mx-2">
        <Select
          options={roleOptions}
          value={selectedRole.map((role) => roleOptions.find((option) => option.value === role))}
          onChange={(options) => setSelectedRole(options?.map((option) => option?.value as UserRole) || [])}
          placeholder={UserRole.Admin}
          className="z-40 w-64"
          isMulti
        />
      </div>
      <div className="z-40 flex items-center pointer-events-auto mx-2">
        <Select
          options={userOptions}
          value={selectedPersons.map((person) => userOptions.find((userOption) => userOption.value === person))}
          onChange={(options) => setSelectedPersons(options?.map((option) => option?.value as string) || [])}
          placeholder={selectedPersons.length > 0 ? selectedPersons.map((person) => userOptions.find((userOption) => userOption.value === person)?.label).join(', ') : 'Select User'}
          className="z-40 w-64 pointer-events-auto"
          isMulti
        />
      </div>
    </div>
  );
}