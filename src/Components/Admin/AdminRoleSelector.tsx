"use client";

import { User, UserRole } from '@prisma/client';
import { getAllUsers, updateUser } from "@/lib/db_actions/Auth";
import { useState, useEffect } from "react";
import Select from 'react-select';

interface RoleSelectorProps {
    onSelect: (selectedRole: UserRole | undefined) => void;

}
//TODO Multi Select
function AdminRoleSelector({onSelect}: RoleSelectorProps) {
    const [selectedRole, setSelectedRole] = useState<UserRole | undefined>();

    const handleSelectedRole = (role: any) => {
        setSelectedRole(role)
        onSelect(role);
    }

    const roleOptions = [
        { value: UserRole.Faculty, label: 'Faculty' },
        { value: UserRole.Coach, label: 'Coaches' },
        { value: UserRole.Admin, label: 'Admin' },
        { value: UserRole.Player, label: 'Player' },
    ];

    return (
        <div className="flex flex-col">
            <label className="text-gray-700 font-bold mb-2" htmlFor="role">
                Role:
            </label>
            <Select options={roleOptions} value={roleOptions.find((option) => option.value === selectedRole)} onChange={(option) => handleSelectedRole(option?.value)} name="select role" placeholder="Select Role" className="z-50 pointer-events-auto w-64 mb-1" />

        </div>
    );
}

export default AdminRoleSelector;

