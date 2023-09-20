import Calendar from "@/Components/Schedule/ScheduleComponent";
import prisma_db from "../../../../../prisma/db";
import { Event } from "@prisma/client";
import { useUser } from '@clerk/nextjs';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { FormEvent } from "react";
/* it imporsts FormEvent from react*/


export const getServerSideProps=(async() => {
  const id = useUser().user?.id

  const user = await prisma_db.user.findUnique({
    where: {
      clerkUserId: id,
    },
  });

  const events = await prisma_db.event.findMany({
    where: {
      role: user?.role,
    },
  });

  return { props: { events } };
}) satisfies GetServerSideProps<{
  events: Event[]
}>
 
export default function Page({
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {




  return (
    <div>
      <div>
      <Calendar events={events}/>
    </div>
      <div>
          <h1>Next Two Weeks</h1>
      </div>
    </div>
  );
}