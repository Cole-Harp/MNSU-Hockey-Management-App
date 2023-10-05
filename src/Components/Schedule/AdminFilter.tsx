"use client";
import { getAllUsers } from "@/lib/db_actions/Auth";
import { clerkClient } from "@clerk/nextjs";
import { UserRole } from "@prisma/client";
import { SetStateAction, useState } from "react";

interface FilterProps {
    onFilter: (selectedRole?: any, selectedPerson?: any) => void;
    users: []
}



export function FilterComponent({ onFilter, users }: FilterProps) {
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [selectedPerson, setSelectedPerson] = useState()

    
  
    const handleFilterChange = (e: { target: { value: SetStateAction<string>; }; }) => {
      setSelectedRole(e.target.value);
      onFilter(selectedRole, selectedPerson);
    };

    const handlePersonChange = (e: any) => {
      setSelectedPerson(e.target.value);
      onFilter(selectedRole, selectedPerson);
    };
  
    return (
      <div>
        <select className="my-2" value={selectedRole} onChange={handleFilterChange}>
          <option value={UserRole.Faculty}>Faculty</option>
          <option value={UserRole.Coach}>Coaches</option>
          <option value={UserRole.Player}>Faculty</option>
          <option value={UserRole.Admin}>Player</option>
        </select>
        <div className="grid grid-cols-3 gap-4">
        <select className="my-2" value={selectedPerson} onChange={handlePersonChange}>
        <option value={undefined}>All</option>
      {users.map((user: any) => (
    <option value={user.id as string} >
      {user.name}
    </option>
    
  ))}
          </select>
    </div>
      </div>
      
    );
  }
  