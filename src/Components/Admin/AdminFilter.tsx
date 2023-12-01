"use client";

import { User, UserRole } from '@prisma/client';
import { getAllUsers } from "@/lib/db_actions/Auth";
import { useState, useEffect } from "react";
import Select from 'react-select';


interface FilterProps {
  onFilter: (selectedRole?: any, selectedPerson?: any) => void;
  user_list: User[];
}

export function FilterComponent({ user_list, onFilter }: FilterProps) {
  const [selectedRole, setSelectedRole] = useState<string>();
  const [selectedPerson, setSelectedPerson] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>(user_list);




  const userOptions = [
    { value: 'all', label: 'All Users' },
    { value: "me", label: 'Me' },
    ...users.map((user) => ({
      value: user.id,
      label: user.name,
    })),
  ];

  const roleOptions = [
    { value: undefined, label: 'All Roles' },
    { value: UserRole.Faculty, label: 'Faculty' },
    { value: UserRole.Coach, label: 'Coaches' },
    { value: UserRole.Admin, label: 'Admin' },
    { value: UserRole.Player, label: 'Player' },
  ];


  return (
    <div className='my-2 z-40 flex'>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onFilter(selectedRole, selectedPerson)}
      >
        Apply filters
      </button>
      <div className="z-40 flex items-center pointer-events-auto mx-2">
        <Select
          options={roleOptions}
          value={roleOptions.find((option) => option.value === selectedRole)}
          onChange={(option) => setSelectedRole(option?.value)}
          placeholder="Select Role"
          className="z-40 w-64"
        />
      </div>
      <Select
      options={userOptions}
      value={selectedPerson.map((person) => userOptions.find((userOption) => userOption.value === person))}
      onChange={(options) => setSelectedPerson(options?.map((option) => option?.value as string) || [])}
      placeholder={selectedPerson.length > 0 ? selectedPerson.map((person) => userOptions.find((userOption) => userOption.value === person)?.label).join(', ') : 'Select User'}
      className="z-40 w-64 pointer-events-auto"
      isMulti // Add this prop to allow multiple selections
    />
    </div>
  );
}