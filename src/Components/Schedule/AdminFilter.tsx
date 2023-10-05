import { SetStateAction, useState } from "react";

interface FilterProps {
    onFilter: (selectedRole: any) => void;
}

export function FilterComponent({ onFilter }: FilterProps) {
    const [selectedRole, setSelectedRole] = useState('All');
  
    const handleFilterChange = (e: { target: { value: SetStateAction<string>; }; }) => {
      setSelectedRole(e.target.value);
      onFilter(e.target.value);
    };
  
    return (
      <div>
        <select className="my-2" value={selectedRole} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Coaches">Coaches</option>
          <option value="Faculty">Faculty</option>
          <option value="Player">Player</option>
        </select>
      </div>
    );
  }
  
  type CalendarProps = {
    options: any;
  };