'use client';

import { FaTrash } from 'react-icons/fa';
import { useOrganization } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { OrganizationMembershipResource } from "@clerk/types";
import InviteUser from "./InviteUser";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { confirmAlert } from 'react-confirm-alert';

interface IParams {
  // Assuming you want to pass some parameters here
}

const MemberList = ({ }: IParams) => {
  const { organization } = useOrganization();

  const [disabled, setDisabled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { membershipList, membership } = useOrganization({
    membershipList: {},
  });

  useEffect(() => {
    // Check if the user has an 'admin' role in the organization
    const userIsAdmin = membership?.role === 'admin';
    setIsAdmin(userIsAdmin);
  }, [membership]);

  const remove = async (membership: OrganizationMembershipResource | null | undefined) => {
    setDisabled(true);
    try {
      await membership!.destroy();
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error('Error removing member:', error);
    } finally {
      setDisabled(false);
    }
  };

  const submit1 = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAdmin) {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure you want to delete this organization?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => remove(organization)
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      });
    } else {
      // Display an error for non-admin users
      alert('You are not authorized to delete this organization.');
    }
  };
  const submit = (membership: OrganizationMembershipResource | null | undefined) => {
    if (isAdmin) {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure you want to remove this member from this organization?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => remove(membership),
          },
          {
            label: 'No',
            onClick: () => {},
          },
        ],
      });
    } else {
      // Display an error for non-admin users
      alert('You are not authorized to remove this member from the organization.');
    }
  };

  return (
    <div className='flex w-full h-full'>
      <div className='w-1/3 border-2 border-black h-full m-1 px-2 rounded-lg'>
        <div className='flex justify-center items-end text-3xl font-bold my-1 border-b-2 h-16 border-neutral-400'>
          Team Members
        </div>
        {isAdmin && <InviteUser />}
        <aside>
          {membershipList?.map((m) => (
            <div key={m.id}>
              <div className='flex flex-row my-1 border-2 border-neutral-400 rounded hover:bg-neutral-100 hover:border-neutral-600'>
                <div className='flex px-2 items-center justify-center'>
                  <img
                    className='bg-green-400 m-2 w-16 h-16 rounded-full'
                    src={m.publicUserData.imageUrl}
                    alt={`${m.publicUserData.firstName} ${m.publicUserData.lastName}`}
                  />
                </div>
                <div className='flex basis-3/5 text-center items-center px-2'>
                  {m.publicUserData.firstName} {m.publicUserData.lastName} :: {m.role}
                </div>
                <div className='flex basis-1/4 justify-end'>
                  {isAdmin && <button
                    className='border-2 border-red-800 bg-red-200 px-4 m-2 hover:bg-red-400 rounded-full shadow-md shadow-slate-600 active:scale-95'
                    onClick={() => submit(m)}
                    disabled={disabled}
                  >
                    Remove
                  </button>}
                  {isAdmin && <button
                    onClick={submit1}
                    className='text-white px-4 py-2 rounded-md absolute bottom-0 right-0 m-2 bg-mnsu_purple hover:bg-purple-800 active:bg-purple-900'
                  >
                     <FaTrash />
                  </button>}
                </div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default MemberList



