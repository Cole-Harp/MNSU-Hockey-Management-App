import CalendarComponent from "@/Components/Schedule/CalendarComponent";
import { getUser, isAdmin } from "@/lib/db_actions/Auth";
import { userGetEvents } from "@/lib/db_actions/Event";

export default async function Page() {
  const admin = await isAdmin();
  const user = await getUser();
  const events = await userGetEvents();

  return (
    <div className="m-2 flex justify-center align-middle">
      {!user ? <div>Not logged in</div> : 
      <CalendarComponent isAdmin={admin} events={events} currUser={user} />}

      
    </div>
  );
}


