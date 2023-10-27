"use client";

import { User, UserRole } from '@prisma/client';
import { getAllUsers } from "@/lib/db_actions/Auth";
import { useState, useEffect } from "react";
import Select from 'react-select';

interface FilterProps {
  onFilter: (selectedRole?: any, selectedPerson?: any) => void;
}

export function FilterComponent({ onFilter }: FilterProps) {
  const [selectedRole, setSelectedRole] = useState<string>();
  const [selectedPerson, setSelectedPerson] = useState<string>("me");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);



  const userOptions = [
    { value: undefined, label: 'All Users' },
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
    <div className='my-2 z-50 flex'>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onFilter(selectedRole, selectedPerson)}
      >
        Apply filters
      </button>
      <div className="z-50 flex items-center pointer-events-auto mx-2">
        <Select
          options={roleOptions}
          value={roleOptions.find((option) => option.value === selectedRole)}
          onChange={(option) => setSelectedRole(option?.value)}
          placeholder="Select Role"
          className="z-50 w-64"
        />
      </div>
      <Select
        options={userOptions}
        value={userOptions.find((userOptions) => userOptions.value === selectedPerson)}
        onChange={(option) => setSelectedPerson(option?.value ?? "me")}
        placeholder={selectedPerson ? userOptions.find((userOptions) => userOptions.value === selectedPerson)?.label : 'Select User'}
        className="z-40 w-64 pointer-events-auto"
      />
    </div>
  );
}