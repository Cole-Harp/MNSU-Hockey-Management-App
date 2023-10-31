'use client'

import { useOrganizationList } from "@clerk/clerk-react";
import { FormEventHandler, useState } from "react";



const CreateOrganization = () => {    

    const { createOrganization } = useOrganizationList();
    const [organizationName, setOrganizationName] = useState("");
    
    const handleSubmit: FormEventHandler<HTMLFormElement> = (c) => {
        c.preventDefault();
        if(organizationName == '')
        {
          throw new Error('cant be empty dawg')
        }
        if(organizationName != '')
        {
          createOrganization({ name: organizationName });
        }
        setOrganizationName("");
      };

    return (
       
    <form onSubmit={handleSubmit} className = 'm-2'>
      <input
        className = 'border-slate-800 border-2 p-2 focus:border-blue-500 focus:outline-none'
        placeholder = 'Organization Name'
        type="text"
        name="organizationName"
        value={organizationName}
        onChange={(c) => setOrganizationName(c.currentTarget.value)}
      />
      <button className = 'border-slate-800 border-2 mx-4 p-2' type="submit">Create organization</button>
    </form>
  );
    
    
}

export default CreateOrganization