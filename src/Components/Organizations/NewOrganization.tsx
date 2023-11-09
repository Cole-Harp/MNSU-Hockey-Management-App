'use client'

import { useOrganizationList } from "@clerk/clerk-react";
import { FormEventHandler, useState } from "react";



const NewOrganization = () => {

    const { createOrganization } = useOrganizationList();
    const [organizationName, setOrganizationName] = useState("");

    const handleSubmit: FormEventHandler<HTMLFormElement> = (c) => {
        c.preventDefault();
        if (organizationName == '') {
            throw new Error('cant be empty dawg')
        }
        if (organizationName != '') {
            createOrganization({ name: organizationName });
        }
        setOrganizationName("");
    };

    return (
        <div className='backdrop-blur-sm w-full h-full flex absolute items-center justify-center'>
            <div className='flex flex-col w-1/2 h-1/2 bg-mnsu_gold  shadow-slate-300 shadow-xl rounded-xl border-mnsu_purple border-2'>
                <div className = 'flex justify-end'>
                    <button className = 'flex justify-center text-center items-center rounded-xl w-8 h-8 hover:text-2xl'>x</button>
                </div>
                <div className='flex font-bold text-xl items-center justify-center h-1/3'>Create a New Organization</div>

                <form onSubmit={handleSubmit} className='flex h-1/3 w-full'>
                    <div className='flex w-full justify-center items-center'>
                        <input
                            className='flex justify-center h-12 items-center border-mnsu_purple rounded border-2 p-2 focus:border-blue-500 focus:outline-none'
                            placeholder='Organization Name'
                            type="text"
                            name="organizationName"
                            value={organizationName}
                            onChange={(c) => setOrganizationName(c.currentTarget.value)}
                        />
                        <button className='border-slate-800 h-12 border-2 mx-4 p-2 bg-white active:scale-95 rounded' type="submit">Create organization</button>
                    </div>
                </form>
            </div>
        </div>
    );


}

export default NewOrganization